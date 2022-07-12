import { NextFunction, Request, Response } from "express";
import { Card, findById } from "../repositories/cardRepository.js";
import { activateCardSchema, cardTypeSchema } from "../utils/schemas.js";
import dayjs from "dayjs";

export function newCardValidation(req: Request, res: Response, next: NextFunction){
    const {employeeId, type} : {employeeId: number, type: string } = req.body;

    const {error} = cardTypeSchema.validate({employeeId, type});
    if (error) {
        return res.status(422).send(error.details);
    }
    
    res.locals = {employeeId, type};
    next();
}

export function activateCardValidation(req: Request, res: Response, next: NextFunction){
    const {number, cardholderName, expirationDate, cvc, password} = req.body;
    const {error} = activateCardSchema.validate({number, cardholderName, expirationDate, cvc, password});
    if (error) throw {type: 'body_error', message: error.details, statusCode: 422}
    
    res.locals = {number, cardholderName, expirationDate, cvc, password};
    next();
}

export async function cardValidationById(req: Request, res: Response, next: NextFunction){
    const {id} = req.params;
    const card : Card = await findById(parseInt(id));
    if (!card) throw {type: 'not_find_error', message: 'cartão inválido ou não encontrado', statusCode: 404};
    
    res.locals = { card };
    next();
}

export async function cardValidationByDate(card: Card) {
    const currentDate = dayjs().format("MM/YY");
    if (currentDate > card.expirationDate) throw {type: "invalid_date", message: 'Cartão expirado', statusCode: 401};
}