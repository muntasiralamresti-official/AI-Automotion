import { Request, Response } from "express";
import { CourierService } from "../services/courier.service.js";
import { FraudService } from "../services/fraud.service.js";

export class CourierController {
  public static async bookSteadfast(req: Request, res: Response) {
    try {
      const { invoice, recipient_name, recipient_phone, recipient_address, cod_amount, note } = req.body;

      if (!recipient_phone || !recipient_address || !cod_amount) {
        return res.status(400).json({
          error: "Phone number, address and COD amount are mandatory for courier booking",
        });
      }

      const result = await CourierService.bookSteadfast({
        invoice,
        recipient_name,
        recipient_phone,
        recipient_address,
        cod_amount,
        note,
      });

      return res.json({ success: true, data: result });
    } catch (error) {
      console.error("[CourierController Steadfast Error]:", error);
      return res.status(500).json({ error: "Failed to dispatch order to Steadfast courier" });
    }
  }

  public static async bookPathao(req: Request, res: Response) {
    try {
      const { recipientName, recipientPhone, recipientAddress, amountToCollect, itemDescription } = req.body;

      if (!recipientPhone || !recipientAddress || amountToCollect === undefined) {
        return res.status(400).json({
          error: "Recipient details and amount are mandatory for Pathao booking",
        });
      }

      const result = await CourierService.bookPathao({
        recipientName,
        recipientPhone,
        recipientAddress,
        amountToCollect,
        itemDescription,
      });

      return res.json(result);
    } catch (error) {
      console.error("[CourierController Pathao Error]:", error);
      return res.status(500).json({ error: "Failed to dispatch order to Pathao courier" });
    }
  }

  public static async fraudCheck(req: Request, res: Response) {
    try {
      const phone = (req.body?.phone || req.query?.phone) as string;

      if (!phone) {
        return res.status(400).json({ error: "Phone number is required for fraud analysis" });
      }

      const result = FraudService.checkPhone(phone);
      return res.json(result);
    } catch (error: any) {
      console.error("[CourierController FraudCheck Error]:", error);
      return res.status(400).json({ error: error.message || "Fraud lookup failed" });
    }
  }
}
