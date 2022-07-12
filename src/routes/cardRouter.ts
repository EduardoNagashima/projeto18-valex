import { Router } from "express";
import { activateCardValidation, newCardValidation, cardValidationById } from "../middlewares/validationMiddleware.js";
import activateCard from "../controllers/activateCardController.js";
import newCard from "../controllers/newCardController.js";
import getBalance from "../controllers/balanceController.js";
import lockCard from "../controllers/lockCardController.js";

const cardRouter = Router();
cardRouter.post('/card/new', newCardValidation, newCard);
cardRouter.post('/card/activate', activateCardValidation, activateCard);
//FIXME FAZER O BALANCO
cardRouter.get('/card/:id/balance', cardValidationById, getBalance);
//AINDA FALTA TERMINAR
cardRouter.post('/card/:id/lock', cardValidationById, lockCard)

export default cardRouter;