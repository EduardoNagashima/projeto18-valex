import { Router } from "express";
import { activateCardValidation, newCardValidation } from "../middlewares/validationMiddleware.js";
import activateCard from "../controllers/activateCardController.js";
import newCard from "../controllers/newCardController.js";

const cardRouter = Router();
cardRouter.post('/card/new', newCardValidation, newCard);
cardRouter.post('/card/activate', activateCardValidation, activateCard);

export default cardRouter;