import { Router } from "express";
import { CourierController } from "../controllers/courier.controller.js";

const router = Router();

router.post("/steadfast", CourierController.bookSteadfast);
router.post("/pathao", CourierController.bookPathao);
router.get("/fraud-check", CourierController.fraudCheck);
router.post("/fraud-check", CourierController.fraudCheck);

export default router;
