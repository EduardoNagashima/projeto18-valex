import { Request, Response } from "express";

import unlockCardService from "../services/unlockCardService.js";
export default async function unlockCard (req: Request, res: Response) {
    const {card} = res.locals;
    const {password} = req.body;

    await unlockCardService(card, password);
    
    res.sendStatus(200);
}