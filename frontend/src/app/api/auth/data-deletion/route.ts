import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const confirmationCode = "DEL-" + Math.floor(100000 + Math.random() * 900000);
    const statusUrl = `https://oddo.ai/data-deletion-status?code=${confirmationCode}`;

    return NextResponse.json({
      url: statusUrl,
      confirmation_code: confirmationCode,
    });
  } catch (error) {
    console.error("[Data Deletion Callback Error]:", error);
    return NextResponse.json({ error: "Failed to process data deletion request" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    message: "Oddo Meta Data Deletion Endpoint. Send POST request with user signed_request.",
  });
}
