import { Router } from "express";
import { activateCardValidation, newCardValidation, cardValidationById } from "../middlewares/validationMiddleware.js";
import activateCard from "../controllers/activateCardController.js";
import newCard from "../controllers/newCardController.js";
import getBalance from "../controllers/balanceController.js";
import lockCard from "../controllers/lockCardController.js";
import unlockCard from "../controllers/unlockCardController.js";

const cardRouter = Router();
cardRouter.post('/card/new', newCardValidation, newCard);
cardRouter.post('/card/activate', activateCardValidation, activateCard);
//FIXME FAZER O BALANCO
cardRouter.get('/card/:id/balance', cardValidationById, getBalance);
cardRouter.post('/card/:id/lock', cardValidationById, lockCard);
cardRouter.post('/card/:id/unlock', cardValidationById, unlockCard);

export default cardRouter;