import Cryptr from "cryptr";
import dayjs from 'dayjs';
import { findByTypeAndEmployeeId } from "../repositories/cardRepository.js";
import { TransactionTypes } from "./../repositories/cardRepository.js";
import * as cardRepository from "./../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "./../repositories/employeeRepository.js";
import numbersGenerator from "../utils/numbersGenerator.js";
import { Employee } from "./../repositories/employeeRepository.js";

export async function createCard(employeeId: number, type: TransactionTypes, apiKey: any){
    const companyAPI = await findByApiKey(apiKey);
    if (!companyAPI) throw {type: "not_find_error", message: 'Empresa não encontrada.', statusCode: 404};

    const employee = await findById(employeeId);
    if (!employee) throw {type: "not_find_error", message: 'Colaborador não encontrado.', statusCode: 404};

    const card = await findByTypeAndEmployeeId(type, employeeId);
    if (card) throw {type: "double_card_error", message: 'Colaborador já possui este tipo de cartão.', statusCode: 403};

    const number = numbersGenerator(16);
    const cardholderName = formattedName(employee)
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
}

const formattedName = (employee: Employee) =>{
    let cardholderName : string = '';

    const fullNameArray = employee.fullName.split(" ");

    for (let i = 0; i < fullNameArray.length; i++){
        if (i === 0 || i === (fullNameArray.length - 1)){
            cardholderName += fullNameArray[i].toUpperCase() + ' ';
        } else if (fullNameArray[i].length >= 3) {
            cardholderName += fullNameArray[i].toUpperCase()[0] + ' ';
        }
    }
    return cardholderName
}

export default createCard;