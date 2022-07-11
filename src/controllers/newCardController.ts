import { Request, Response } from "express";
import createCard from "../services/createCardService.js";

export default async function newCard(req: Request, res: Response){
    const {employeeId, type} = res.locals;

    let apiKey = req.headers["x-api-key"];
    if (!apiKey) return res.sendStatus(403);
    await createCard(employeeId, type, apiKey);

    return res.status(201).send("Cartão criado com sucesso.");
}