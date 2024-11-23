import { NextResponse } from "next/server";

// Define the external API URL
const EXTERNAL_API_URL = "http://jsonplaceholder.typicode.com/posts";

export async function GET() {
  try {
    // Fetch data from the external API
    const response = await fetch(EXTERNAL_API_URL);

    // Handle unsuccessful responses
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch the data from the API",
        status: response.status,
      });
    }

    // Parse JSON response
    const data = await response.json();

    // Return successful response
    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    // Narrow down error type to handle known structures
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: "An error occurred while fetching the data from the API",
        error: error.message,
      });
    } else {
      // Fallback for unknown error structures
      return NextResponse.json({
        success: false,
        message: "An unknown error occurred",
      });
    }
  }
}
