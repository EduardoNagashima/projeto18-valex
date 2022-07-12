import { Request, Response } from "express";
import rechargeService from "../services/rechargeService.js";

export default async function recharge(req: Request, res: Response){
    const { card } = res.locals;
    const { value } : {value : number} = req.body;
    if (value <= 0) throw {type: 'invalid_value', message: 'Valor inválido', statusCode: 400}

    await rechargeService(card, value);

    res.sendStatus(201);
}