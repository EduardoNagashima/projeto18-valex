import { NextFunction, Request, Response } from "express";
import { cardTypeSchema } from "../utils/schemas.js";

export function newCardValidation(req: Request, res: Response, next: NextFunction){
    const {employeeId, type} : {employeeId: number, type: string } = req.body;
    const {error} = cardTypeSchema.validate({employeeId, type});
    
    if (error) {
        return res.status(422).send(error.details);
    }
    
    res.locals = {employeeId, type};
    next();
}