import { Response, Request } from "express";
import paymentService from "../services/paymentService.js";

export interface paymentData {
    "cardId": number,
    "password": string,
    "businessId": number,
    "value": number
}

export default async function payment(req: Request, res: Response) {
    const {cardId, password, businessId, value} : paymentData = req.body;
    await paymentService({cardId, password, businessId, value})
    return res.sendStatus(201);
}