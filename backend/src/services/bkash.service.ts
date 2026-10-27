import { BkashPaymentPayload } from "../types/index.js";
import { CONFIG } from "../config/constants.js";

export class BkashService {
  public static createPayment(payload: BkashPaymentPayload) {
    const paymentID = "TRX-BK-" + Math.floor(100000 + Math.random() * 900000);
    const bkashURL = `${CONFIG.BKASH.CHECKOUT_BASE}?paymentID=${paymentID}&amount=${payload.amount}`;
    const qrData = `bkash://payment?merchant=01700000000&amount=${payload.amount}&ref=${payload.orderId || "ODDO"}`;

    return {
      success: true,
      paymentID,
      amount: payload.amount,
      currency: "BDT",
      orderId: payload.orderId || "ORD-" + Math.floor(1000 + Math.random() * 9000),
      purpose: payload.purpose || "advance_delivery_fee",
      customerPhone: payload.phone || "01700000000",
      checkoutUrl: bkashURL,
      qrData,
      status: "Initiated",
      expiresInMinutes: 15,
      instructions: "Scan QR code or click checkout link to pay instantly using bKash app or USSD *247#.",
      timestamp: new Date().toISOString(),
    };
  }
}
