import { Request, Response } from "express";
import { getBalanceService } from "../services/getBalanceService.js";

export default async function getBalance(req: Request, res: Response){    
    const { card } = res.locals;

    const balance = await getBalanceService(card);

    return res.send(balance);
}