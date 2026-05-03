import { createCheckoutSession } from "@/controllers/billing.controller";
import { Router } from "express";

const billingRoutes = Router();

billingRoutes.get("/subscription", getBillingSubscription);
billingRoutes.post("/checkout", createCheckoutSession);

export default billingRoutes;
