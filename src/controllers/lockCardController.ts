import { Request, Response } from "express";

import lockCardService from "../services/lockCardService.js";
export default async function lockCard(req: Request, res: Response) {
    const { card } = res.locals;
    const { password } = req.body;
    if (!password) throw { type: 'unvalid_entry', message: 'senha errada ou nula', statusCode: 401 };

    await lockCardService(card, password);

    res.sendStatus(201);
}