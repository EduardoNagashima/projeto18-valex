import { Request, Response } from "express";
import { findByTypeAndEmployeeId } from "../repositories/cardRepository.js";
import { findById } from "./../repositories/employeeRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import createCard from "./../utils/createCardUtils.js";

export async function newCard(req: Request, res: Response){
    const {employeeId, cardType} = res.locals;

    let apiKey = req.headers["x-api-key"];
    if (!apiKey) return res.sendStatus(403);
    
    //SERVICE PARA CRIAR O CARTÃO
    const companyAPI = await findByApiKey(apiKey);
    if (!companyAPI) return res.sendStatus(403);

    const employee = await findById(employeeId);
    if (!employee) return res.sendStatus(404);

    const card = await findByTypeAndEmployeeId(cardType, employeeId);
    if (!card) return res.status(401).send('Erro! O colaborador já possui este tipo de cartão.');
    
    const cardNumber = await createCard();

    const fullNameArray = employee.fullName.split(" ");
    

    return res.sendStatus(200);
}