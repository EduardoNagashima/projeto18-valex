import { Request, Response } from "express";
import createCard from "../services/createCardService.js";

export default async function newCard(req: Request, res: Response){
    const {employeeId, type} = res.locals;

    await createCard(employeeId, type);

    return res.status(201).send("Cartão criado com sucesso.");
}