import { CourierBookingPayload, PathaoBookingPayload } from "../types/index.js";

export class CourierService {
  public static async bookSteadfast(payload: CourierBookingPayload) {
    const consignmentId = "STDFST" + Math.floor(100000 + Math.random() * 900000);
    const trackingCode = "TRK" + Math.floor(10000000 + Math.random() * 90000000);

    return {
      status: 200,
      message: "Consignment created successfully",
      consignment: {
        consignment_id: consignmentId,
        invoice: payload.invoice || "INV-" + Date.now().toString().slice(-6),
        tracking_code: trackingCode,
        recipient_name: payload.recipient_name,
        recipient_phone: payload.recipient_phone,
        recipient_address: payload.recipient_address,
        cod_amount: payload.cod_amount,
        status: "in_review",
        created_at: new Date().toISOString(),
      },
    };
  }

  public static async bookPathao(payload: PathaoBookingPayload) {
    const consignmentId = "PTH-" + Math.floor(100000 + Math.random() * 900000);
    const trackingCode = "PTH-TRK-" + Math.floor(1000000 + Math.random() * 9000000);

    return {
      type: "success",
      message: "Order created successfully on Pathao Courier",
      data: {
        consignment_id: consignmentId,
        tracking_code: trackingCode,
        recipient_name: payload.recipientName,
        recipient_phone: payload.recipientPhone,
        recipient_address: payload.recipientAddress,
        amount_to_collect: payload.amountToCollect,
        order_status: "Pending",
        delivery_fee: 60,
      },
      trackingCode,
    };
  }
}
