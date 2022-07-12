import { Router } from "express";
import recharge from "../controllers/rechargeController.js";
import { cardValidationByParamsId, companyApiValidation } from "../middlewares/validationMiddleware.js";

const rechargeRouter = Router();

rechargeRouter.post('/recharge/:id', companyApiValidation, cardValidationByParamsId, recharge);

export default rechargeRouter;