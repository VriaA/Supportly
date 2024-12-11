import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Initialize Groq with your API key
const groq = new Groq({ apiKey: process.env.GROQ_KEY });

export async function POST(req) {
  try {
    // Parse the request body
    const data = await req.json();

    // Fetch chat completion from Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: data, // Use the messages from the request body
      model: "llama3-8b-8192", // Ensure this model is correct
    });

    // Prepare the response
    const responseContent = chatCompletion.choices[0]?.message?.content || "No content returned";

    // Return the response as a stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          controller.enqueue(encoder.encode(responseContent));
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream);
  } catch (error) {

    // Return an error response
    const errorResponse = JSON.stringify({
      error: 'An error occurred while processing the request.',
      details: error.message,
    });

    return new NextResponse(errorResponse, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
