import { Request, Response } from "express";
import activateCardService from "../services/activateCardService.js";

export default async function activateCard(req: Request, res: Response){
    const {number, cardholderName, expirationDate, cvc, password} = res.locals;
    await activateCardService(number, cardholderName, expirationDate, cvc, password);
    
    return res.status(201).send('Cartão ativado com sucesso.');
}