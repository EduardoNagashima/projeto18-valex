import { Router } from "express";
import { newCard } from "../controllers/newCardController.js";
import { newCardValidation } from "../middlewares/validationMiddleware.js";

const cardRouter = Router();
cardRouter.post('/newcard', newCardValidation, newCard);

export default cardRouter;