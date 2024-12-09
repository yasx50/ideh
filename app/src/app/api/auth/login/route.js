import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import prisma from '@/prisma/client';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req, { params }) {
  try {
    const cookies = req.cookies; // Extract cookies from the request
    const token = cookies?.token; // Look for the token in the cookies
    let user;

    // If a token exists in cookies, verify it
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        user = await prisma.user.findUnique({
          where: { id: decoded.id },
        });

        if (user) {
          // If token is valid and user exists, auto-login
          return NextResponse.json({
            status: 200,
            message: 'Auto-login successful',
            user: { id: user.id, email: user.email, name: user.name },
          });
        } else {
          return NextResponse.json({
            status: 401,
            error: { message: 'User associated with the token does not exist' },
          });
        }
      } catch (err) {
        console.error('Invalid token:', err.message);
        // If token is invalid, continue with the standard login flow
      }
    }

    // Standard login flow if no valid token is found
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({
        status: 400,
        error: { message: 'All fields are required' },
      });
    }

    user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        status: 400,
        error: { message: 'User not found' },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        status: 400,
        error: { message: 'Invalid credentials' },
      });
    }

    const newToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set the new token in cookies
    const response = NextResponse.json({
      status: 200,
      message: 'Login successful',
      user: { id: user.id, email: user.email, name: user.name },
    });

    response.cookies.set('token', newToken, {
      httpOnly: true, // Protects from client-side scripts
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 3600, // 1 hour
      path: '/',
    });

    console.log(newToken);
    

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error: { message: 'Something went wrong' },
    });
  }
}
