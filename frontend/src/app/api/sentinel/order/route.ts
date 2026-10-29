import { NextResponse } from "next/server";

export interface SentinelOrderRequest {
  customerName: string;
  phone: string;
  email?: string;
  vehicleModel: string;
  packageId: "starter" | "fleet_pro" | "enterprise";
  quantity?: number;
  deliveryAddress: string;
  paymentMethod: "bkash" | "nagad" | "cod";
  trxId?: string;
}

export async function POST(req: Request) {
  try {
    const body: SentinelOrderRequest = await req.json();

    if (!body.customerName || !body.phone || !body.packageId) {
      return NextResponse.json(
        { error: "Customer name, phone, and package are required." },
        { status: 400 }
      );
    }

    const orderId = "SNT-" + Math.floor(1000 + Math.random() * 9000);
    const licenseKey = "ZYNCOO-SNT-" + Math.random().toString(36).substring(2, 6).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();

    const packageNames = {
      starter: "Zyncoo Sentinel - Personal Driver Starter Kit (1 Vehicle)",
      fleet_pro: "Zyncoo Sentinel - Fleet & Transport Pro (5 Vehicles + OBD-II)",
      enterprise: "Zyncoo Sentinel - Enterprise Transport Network (20 Vehicles + GPS SOS)",
    };

    const packagePrices = {
      starter: 4490,
      fleet_pro: 12990,
      enterprise: 29990,
    };

    const totalAmount = packagePrices[body.packageId] || 4490;

    const orderData = {
      orderId,
      licenseKey,
      packageName: packageNames[body.packageId],
      amount: totalAmount,
      customerName: body.customerName,
      phone: body.phone,
      vehicleModel: body.vehicleModel || "Standard Vehicle",
      deliveryAddress: body.deliveryAddress,
      paymentMethod: body.paymentMethod,
      trxId: body.trxId || "PENDING_VERIFY",
      status: body.paymentMethod === "cod" ? "CONFIRMED_COD" : "PAYMENT_AWAITING_VERIFY",
      downloadUrl: "/downloads/Zyncoo-Driver-Sentinel-v1.0.zip",
      setupGuideUrl: "https://zyncoo.ai/sentinel/guide",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Driver Sentinel Order Placed Successfully!",
      order: orderData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
