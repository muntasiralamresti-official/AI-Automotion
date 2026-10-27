import { NextRequest, NextResponse } from "next/server";

interface PaymentRequest {
  orderId: string;
  amount: number;
  phone: string;
  purpose: "advance_delivery_fee" | "full_order";
}

export async function POST(req: NextRequest) {
  try {
    const body: PaymentRequest = await req.json();
    const { orderId, amount, phone, purpose } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid payment amount" }, { status: 400 });
    }

    // Generate dynamic bKash PGW checkout simulation session
    const paymentID = "TRX-BK-" + Math.floor(100000 + Math.random() * 900000);
    const bkashURL = `https://checkout.pay.bka.sh/v1.2.0-beta/tokenized/checkout?paymentID=${paymentID}&amount=${amount}`;
    const qrData = `bkash://payment?merchant=01700000000&amount=${amount}&ref=${orderId || "ODDO"}`;

    return NextResponse.json({
      success: true,
      paymentID,
      amount,
      currency: "BDT",
      orderId: orderId || "ORD-" + Math.floor(1000 + Math.random() * 9000),
      purpose: purpose || "advance_delivery_fee",
      customerPhone: phone || "01700000000",
      checkoutUrl: bkashURL,
      qrData,
      status: "Initiated",
      expiresInMinutes: 15,
      instructions: "Scan QR code or click checkout link to pay instantly using bKash app or USSD *247#.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[bKash Create API Error]:", error);
    return NextResponse.json({ error: "Failed to generate bKash payment invoice" }, { status: 500 });
  }
}
