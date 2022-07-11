import { NextFunction, Request, Response } from "express";
import { activateCardSchema, cardTypeSchema } from "../utils/schemas.js";

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
    if (error) {
        throw {type: 'body_error', message: error.details, statusCode: 422}
    }
    res.locals = {number, cardholderName, expirationDate, cvc, password};
    next();
}