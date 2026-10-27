import { NextRequest, NextResponse } from "next/server";

interface PathaoOrderRequest {
  storeId?: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity?: number; // Pathao city ID
  recipientZone?: number; // Pathao zone ID
  deliveryType?: 48 | 12; // Normal 48h vs Express 12h
  itemType?: 1 | 2; // Document vs Parcel
  specialInstruction?: string;
  itemQuantity?: number;
  itemWeight?: number; // in KG
  amountToCollect: number; // COD amount
  itemDescription?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: PathaoOrderRequest = await req.json();
    const {
      recipientName,
      recipientPhone,
      recipientAddress,
      amountToCollect,
      itemDescription,
    } = body;

    if (!recipientName || !recipientPhone || !recipientAddress) {
      return NextResponse.json(
        { error: "recipientName, recipientPhone and recipientAddress are required" },
        { status: 400 }
      );
    }

    // Pathao consignment generator simulation
    const consignmentId = "PTH-" + Math.floor(100000 + Math.random() * 900000);
    const trackingCode = "PATHAO" + Math.floor(10000000 + Math.random() * 90000000);

    return NextResponse.json({
      success: true,
      courier: "Pathao Courier",
      consignmentId,
      trackingCode,
      status: "Pickup Pending",
      order: {
        recipientName,
        recipientPhone,
        recipientAddress,
        amountToCollect: amountToCollect || 0,
        itemDescription: itemDescription || "E-Commerce Parcel",
      },
      hub: "Dhaka Central Sorting Hub",
      estimatedDelivery: "1-2 Business Days",
      bookedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Pathao Courier API Error]:", error);
    return NextResponse.json({ error: "Failed to create Pathao consignment" }, { status: 500 });
  }
}
