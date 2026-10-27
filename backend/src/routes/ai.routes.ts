import { Router } from "express";
import { AiController } from "../controllers/ai.controller.js";

const router = Router();

router.post("/chat", AiController.chat);

export default router;
