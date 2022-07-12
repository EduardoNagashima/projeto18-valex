import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import { findByCardDetails, update } from "../repositories/cardRepository.js";
import { Employee, findById } from "../repositories/employeeRepository.js";
import { cardValidationByDate } from "../middlewares/validationMiddleware.js";

export default async function activateCardService(number: string, cardholderName : string, expirationDate: string, cvc : string, password : string){

    const card = await findByCardDetails(number, cardholderName, expirationDate);
    if (!card) throw {type: "not_find_error", message: 'Cartão não encontrado.', statusCode: 404};

    cardValidationByDate(card);

    if (card.password) throw {type: "card_already_active", message: 'Cartão já foi ativado', statusCode: 409};

    const employee : Employee = await findById(card.employeeId);
    const cryptr = new Cryptr(employee.fullName);
    const securityCode = cryptr.decrypt(card.securityCode);
    if (securityCode !== cvc) throw {type: "cvc_not_right", message: 'Código do cartão não está correto', statusCode: 401};

    password = bcrypt.hashSync(password, 10);
    update(card.id, {password: password});
}