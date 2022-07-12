import { Router } from "express";
import { activateCardValidation, newCardValidation, cardValidationByParamsId, companyApiValidation } from "../middlewares/validationMiddleware.js";
import activateCard from "../controllers/activateCardController.js";
import newCard from "../controllers/newCardController.js";
import getBalance from "../controllers/balanceController.js";
import lockCard from "../controllers/lockCardController.js";
import unlockCard from "../controllers/unlockCardController.js";

const cardRouter = Router();
cardRouter.post('/card/new', companyApiValidation, newCardValidation, newCard);
cardRouter.post('/card/:id/activate', cardValidationByParamsId, activateCardValidation, activateCard);
cardRouter.get('/card/:id/balance', cardValidationByParamsId, getBalance);
cardRouter.post('/card/:id/lock', cardValidationByParamsId, lockCard);
cardRouter.post('/card/:id/unlock', cardValidationByParamsId, unlockCard);

export default cardRouter;