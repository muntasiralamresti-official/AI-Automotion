import { Request, Response } from "express";
import { GeminiService } from "../services/gemini.service.js";

export class AiController {
  public static async chat(req: Request, res: Response) {
    try {
      const { message, channel, storeName, conversationHistory } = req.body;

      if (!message || !message.trim()) {
        return res.status(400).json({ error: "Message content is required" });
      }

      const result = GeminiService.processChat(
        message,
        channel || "whatsapp",
        storeName || "GadgetZone BD",
        conversationHistory || []
      );

      return res.json(result);
    } catch (error) {
      console.error("[AiController Error]:", error);
      return res.status(500).json({ error: "Internal AI processing error" });
    }
  }
}
