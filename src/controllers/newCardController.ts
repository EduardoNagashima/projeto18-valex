import { Request, Response } from "express";
import { findByTypeAndEmployeeId } from "../repositories/cardRepository.js";
import dayjs from 'dayjs';
import { findById } from "./../repositories/employeeRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import numbersGenerator from "../utils/numbersGenerator.js";
import Cryptr from "cryptr";
import * as cardRepository from "./../repositories/cardRepository.js";

export async function newCard(req: Request, res: Response){
    const {employeeId, type} = res.locals;

    let apiKey = req.headers["x-api-key"];
    if (!apiKey) return res.sendStatus(403);
    
    //SERVICE PARA CRIAR O CARTÃO
    const companyAPI = await findByApiKey(apiKey);
    if (!companyAPI) return res.sendStatus(403);

    const employee = await findById(employeeId);
    if (!employee) return res.sendStatus(404);

    const card = await findByTypeAndEmployeeId(type, employeeId);
    if (card) return res.status(401).send('Erro! O colaborador já possui este tipo de cartão.');
    
    const number = numbersGenerator(16);
    let cardholderName : string = '';

    const fullNameArray = employee.fullName.split(" ");

    for (let i = 0; i < fullNameArray.length; i++){
        if (i === 0 || i === (fullNameArray.length - 1)){
            cardholderName += fullNameArray[i].toUpperCase() + ' ';
        } else if (fullNameArray[i].length >= 3) {
            cardholderName += fullNameArray[i].toUpperCase()[0] + ' ';
        }
    }

    const expirationDate = dayjs().add(2, 'year').format('MM/YY');

    const CVC = numbersGenerator(3);

    const cryptr = new Cryptr(employee.fullName);
    const securityCode = cryptr.encrypt(CVC);
    
    const cardData = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type,
  }

    cardRepository.insert(cardData);

    return res.sendStatus(200);
}