import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    // Get the token from cookies
    const token = req.cookies?.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { status: 401, error: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }

    let decoded;
    try {
      // Verify the token
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return NextResponse.json(
        { status: 403, error: 'Forbidden: Invalid or expired token' },
        { status: 403 }
      );
    }

    const userId = decoded.id;

    // Extract the dynamic 'id' from the route params
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { status: 400, error: 'Bad Request: Invalid or missing ID' },
        { status: 400 }
      );
    }

    // Fetch the specific history entry
    const history = await prisma.userHistory.findUnique({
      where: { id: parseInt(id, 10), createdByUserId: userId },
    });

    if (!history) {
      return NextResponse.json(
        { status: 404, error: 'History not found' },
        { status: 404 }
      );
    }

    // Convert stored string back to JSON
    const formattedHistory = {
      id: history.id,
      promptText: history.promptText,
      generatedOutput: JSON.parse(history.generatedOutput),
      createdAt: history.createdAt,
    };

    return NextResponse.json({ status: 200, history: formattedHistory });
  } catch (error) {
    console.error('Internal Server Error:', error.message);
    return NextResponse.json(
      { status: 500, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
