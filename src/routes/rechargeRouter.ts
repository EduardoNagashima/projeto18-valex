import { Router } from "express";
import recharge from "../controllers/rechargeController.js";
import { cardValidationById, companyApiValidation } from "../middlewares/validationMiddleware.js";

const rechargeRouter = Router();

rechargeRouter.post('/recharge/:id', companyApiValidation, cardValidationById, recharge);

export default rechargeRouter;