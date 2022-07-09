import { NextFunction, Request, Response } from "express";
import { cardTypeSchema } from "../utils/schemas.js";

export function newCardValidation(req: Request, res: Response, next: NextFunction){
    const {employeeId, cardType} : {employeeId: number, cardType: string } = req.body;
    const {error} = cardTypeSchema.validate({employeeId, cardType});
    
    if (error) {
        return res.status(422).send(error.details);
    }
    
    res.locals = {employeeId, cardType};
    next();
}