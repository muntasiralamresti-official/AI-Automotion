import { Request, Response } from "express";
import { BkashService } from "../services/bkash.service.js";

export class PaymentController {
  public static async createBkash(req: Request, res: Response) {
    try {
      const { orderId, amount, phone, purpose } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid payment amount" });
      }

      const result = BkashService.createPayment({
        orderId,
        amount,
        phone,
        purpose,
      });

      return res.json(result);
    } catch (error) {
      console.error("[PaymentController Error]:", error);
      return res.status(500).json({ error: "Failed to generate bKash payment invoice" });
    }
  }
}
