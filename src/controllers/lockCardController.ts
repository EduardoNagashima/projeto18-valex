import { Request, Response } from "express";

import lockCardService from "../services/lockCardService.js";
export default async function lockCard (req: Request, res: Response) {
    const {card} = res.locals;
    const {password} = req.body;

    await lockCardService(card, password);
    
    res.sendStatus(200);
}