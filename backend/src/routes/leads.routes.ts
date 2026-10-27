import { Router } from "express";
import { LeadsController } from "../controllers/leads.controller.js";

const router = Router();

router.get("/orders", LeadsController.getOrders);
router.patch("/orders/:id/verify", LeadsController.verifyOrder);
router.patch("/orders/:id/dispatch", LeadsController.dispatchOrder);

export default router;
