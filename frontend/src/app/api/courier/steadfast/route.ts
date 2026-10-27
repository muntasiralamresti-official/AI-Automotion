import { NextRequest, NextResponse } from "next/server";

interface CourierBookingPayload {
  invoice: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  cod_amount: number;
  note?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CourierBookingPayload = await req.json();
    const { invoice, recipient_name, recipient_phone, recipient_address, cod_amount, note } = body;

    if (!recipient_phone || !recipient_address || !cod_amount) {
      return NextResponse.json(
        { error: "Phone number, address and COD amount are mandatory for courier booking" },
        { status: 400 }
      );
    }

    // Generate mock consignment response or connect to Steadfast Portal API
    // Real Steadfast Endpoint: https://portal.steadfast.com.bd/api/v1/create_order
    const consignmentId = "STDFST" + Math.floor(100000 + Math.random() * 900000);
    const trackingCode = "TRK" + Math.floor(10000000 + Math.random() * 90000000);

    const bookingResponse = {
      status: 200,
      message: "Consignment created successfully",
      consignment: {
        consignment_id: consignmentId,
        invoice: invoice || "INV-" + Date.now().toString().slice(-6),
        tracking_code: trackingCode,
        recipient_name,
        recipient_phone,
        recipient_address,
        cod_amount,
        status: "in_review",
        created_at: new Date().toISOString(),
      },
    };

    console.log(`[Steadfast Dispatch] Consignment #${consignmentId} booked for ${recipient_phone}`);

    return NextResponse.json({
      success: true,
      data: bookingResponse,
    });
  } catch (error) {
    console.error("[Steadfast Courier Error]:", error);
    return NextResponse.json(
      { error: "Failed to dispatch order to courier" },
      { status: 500 }
    );
  }
}
