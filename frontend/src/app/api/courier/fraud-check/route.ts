import { NextRequest, NextResponse } from "next/server";

interface FraudCheckRequest {
  phone: string;
}

export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get("phone");
  return handleFraudCheck(phone);
}

export async function POST(req: NextRequest) {
  try {
    let phone: string | null = null;
    try {
      const body = await req.json();
      phone = body?.phone;
    } catch {
      // Fallback: check query params or raw text
      phone = req.nextUrl.searchParams.get("phone");
    }

    return handleFraudCheck(phone);
  } catch (error) {
    console.error("[Fraud Check API Error]:", error);
    return NextResponse.json({ error: "Failed to perform fraud lookup" }, { status: 500 });
  }
}

function handleFraudCheck(phone: string | null | undefined) {
  try {
    if (!phone) {
      return NextResponse.json({ error: "Phone number is required for fraud analysis" }, { status: 400 });
    }

    // Clean phone number format
    const cleaned = phone.replace(/[^\d]/g, "").slice(-11);

    if (cleaned.length !== 11 || !cleaned.startsWith("01")) {
      return NextResponse.json({ error: "Invalid Bangladeshi 11-digit mobile number format" }, { status: 400 });
    }

    // Deterministic simulation / courier API lookup
    // If the phone ends in specific digits or is known, calculate risk rating
    const lastDigits = parseInt(cleaned.slice(-2), 10);
    
    let totalOrders = 12;
    let successfulDeliveries = 11;
    let returnedParcels = 1;
    let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "LOW";
    let advancePaymentRequired = false;
    let recommendation = "Approve Cash on Delivery (COD). Trusted buyer profile.";

    if (lastDigits > 85) {
      // Chronic returner profile
      totalOrders = 9;
      successfulDeliveries = 4;
      returnedParcels = 5;
      riskLevel = "HIGH";
      advancePaymentRequired = true;
      recommendation = "High parcel refusal history (55% RTO). Zyncoo recommends requesting ৳100 advance delivery fee via bKash before shipping.";
    } else if (lastDigits > 70) {
      // Medium returner profile
      totalOrders = 7;
      successfulDeliveries = 5;
      returnedParcels = 2;
      riskLevel = "MEDIUM";
      advancePaymentRequired = false;
      recommendation = "Moderate return history. Call to confirm before generating courier label.";
    }

    const successRate = Math.round((successfulDeliveries / totalOrders) * 100);

    return NextResponse.json({
      success: true,
      phone: cleaned,
      history: {
        totalOrders,
        successfulDeliveries,
        returnedParcels,
        successRate: `${successRate}%`,
        riskLevel,
        advancePaymentRequired,
        recommendation,
        checkedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("[Fraud Check API Error]:", error);
    return NextResponse.json({ error: "Failed to perform fraud lookup" }, { status: 500 });
  }
}
