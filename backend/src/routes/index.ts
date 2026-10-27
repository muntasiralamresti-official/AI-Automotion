import { Router } from "express";
import aiRoutes from "./ai.routes.js";
import courierRoutes from "./courier.routes.js";
import paymentRoutes from "./payment.routes.js";
import webhookRoutes from "./webhook.routes.js";
import leadsRoutes from "./leads.routes.js";

const apiRouter = Router();

apiRouter.use("/ai", aiRoutes);
apiRouter.use("/courier", courierRoutes);
apiRouter.use("/payment", paymentRoutes);
apiRouter.use("/webhooks", webhookRoutes);
apiRouter.use("/leads", leadsRoutes);

export default apiRouter;
