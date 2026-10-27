import { Request, Response } from "express";
import crypto from "crypto";
import { CONFIG } from "../config/constants.js";

function verifySignature(rawBody: string, signatureHeader: string | undefined): boolean {
  if (!signatureHeader) return false;

  try {
    const [algorithm, signature] = signatureHeader.split("=");
    if (algorithm !== "sha256" || !signature) return false;

    const expectedHash = crypto
      .createHmac("sha256", CONFIG.META.APP_SECRET)
      .update(rawBody)
      .digest("hex");

    return crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedHash, "hex"));
  } catch {
    return false;
  }
}

export class WebhookController {
  public static verifyMeta(req: Request, res: Response) {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === CONFIG.META.VERIFY_TOKEN) {
      console.log("[Meta Webhook] Successfully verified webhook challenge:", challenge);
      return res.status(200).send(challenge);
    }

    return res.status(403).json({ error: "Forbidden: Verification token mismatch" });
  }

  public static handleMetaEvents(req: Request, res: Response) {
    try {
      // 1. Return immediate 200 OK to satisfy Meta's 3-second SLA
      res.status(200).json({ status: "EVENT_RECEIVED" });

      // 2. Process asynchronous payload in background
      const payload = req.body;
      if (payload?.object === "page" || payload?.object === "whatsapp_business_account") {
        console.log(`[Meta Event] Inbound ${payload.object} event received.`);
      }
    } catch (error) {
      console.error("[WebhookController Error]:", error);
    }
  }
}
