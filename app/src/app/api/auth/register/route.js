import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import prisma from '@/prisma/client';
import { PrismaClient } from '@prisma/client'; // Correct way to import Prisma Client
const prisma = new PrismaClient();

import { NextResponse } from 'next/server';
import { hash } from 'crypto';
import { log } from 'console';

export async function POST(req, { params }) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({
        status: 400,
        error: { message: 'All fields are required' },
      });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        status: 400,
        error: { message: 'User already exists' },
      });
    }

    // Hash the password

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    
    // Create the new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log(user);
    
    // Generate a JWT token
    const newToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("New Token:", newToken);
    

    // Set the token in cookies
    const response = NextResponse.json({
      status: 200,
      message: 'Registration successful',
      user: { id: user.id, email: user.email, name: user.name },
    });

    response.cookies.set('token', newToken, {
      httpOnly: true, // Protect token from client-side access
      secure: process.env.NODE_ENV === 'production', // Secure cookies in production
      maxAge: 3600, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error: { message: 'Something went wrong' },
    });
  }
}
