import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Get the token from cookies
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { status: 401, error: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Parse the request body
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { status: 400, error: 'Bad Request: URL is required' },
        { status: 400 }
      );
    }

    // Fetch response from the external AI service
    const aiResponse = await fetch(process.env.AI_SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (!aiResponse.ok) {
      console.error('[ERROR] Failed to fetch AI response:', aiResponse.statusText);
      throw new Error('Failed to fetch AI response');
    }

    const responseData = await aiResponse.json();
    const generatedOutput = JSON.stringify(responseData); // Convert response to a string

    await prisma.scrapedData.create({
      data: {
        url,
        content: generatedOutput,
        createdByUserId: userId,
      },
    });

    // Save the result to the database
    const history = await prisma.userHistory.create({
      data: {
        promptText: url,
        generatedOutput,
        createdByUserId: userId,
      },
    });

    return NextResponse.json({ status: 201, message: 'History saved', history });
  } catch (error) {
    console.error('[ERROR]', error.message || error);

    return NextResponse.json(
      { status: 500, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// If using dynamic routing for the route: /api/history/[id]
export async function GET(req) {
  try {
    // Get the token from cookies
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { status: 401, error: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Get the ID from the dynamic route (e.g., /api/history/123)
    console.log("Url:", req.nextUrl);
    console.log("Pathname:", req.nextUrl.pathname);
    
    // Extracting id from the pathname
    let id = req.nextUrl.pathname.split('/').pop(); // Assuming the URL is /api/history/[id]
    console.log("Extracted ID:", id);
    
    // Check if the id is a valid number
    let validId = isNaN(id) ? undefined : parseInt(id, 10); // If id is not a number, set it to undefined
    console.log("Validated ID:", validId);

    if (validId) {
      // Fetch a specific user's history from the database by ID
      const history = await prisma.userHistory.findUnique({
        where: { id: validId, createdByUserId: userId },
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
    }

    // If no id is provided, fetch all histories
    const histories = await prisma.userHistory.findMany({
      where: { createdByUserId: userId },
      orderBy: { createdAt: 'desc' },
    });

    // Convert stored string back to JSON
    const formattedHistories = histories.map((history) => ({
      id: history.id,
      promptText: history.promptText,
      generatedOutput: JSON.parse(history.generatedOutput),
      createdAt: history.createdAt,
    }));

    return NextResponse.json({ status: 200, histories: formattedHistories });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 500, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
