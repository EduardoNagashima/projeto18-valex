import { Router } from "express";
import payment from "../controllers/paymentController.js";
import { paymentValidation } from "../middlewares/validationMiddleware.js";

const paymentRouter = Router();

paymentRouter.post("/payment", paymentValidation, payment);

export default paymentRouter;