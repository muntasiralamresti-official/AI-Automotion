import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";

const router = Router();

router.post("/bkash-create", PaymentController.createBkash);

export default router;
