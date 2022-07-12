import { cardValidationByDate, cardValidationById } from "../middlewares/validationMiddleware.js";
import bcrypt from "bcrypt";
import { paymentData } from "../controllers/paymentController.js";
import * as businessRepository from "../repositories/businessRepository.js";
import { getBalanceService } from "./getBalanceService.js";
import * as payment from "../repositories/paymentRepository.js";

export default async function paymentService({cardId, password, businessId, value} : paymentData){
    const card = await cardValidationById(cardId);
    await cardValidationByDate(card);
    if (card.isBlocked) throw {type: 'card_blocked', message: "Cartão bloqueado", statusCode: 401};
    if (!card.password) throw {type: 'invalid_card_error', message: "Cartão ainda não está ativo", statusCode: 401};

    const confirmPassword = bcrypt.compareSync(password.toString(), card.password);
    if (!confirmPassword) throw {type: 'invalid_password', message: "Senha incorreta", statusCode: 403};

    const business = await businessRepository.findById(businessId);
    if (!business) throw {type: 'business_not_found', message: "Comercio não encontrado", statusCode: 404};

    if (business.type !== card.type) throw {type: 'card_type_error', message: "Cartão inválido para o tipo de comercio", statusCode: 403};

    const balance = await getBalanceService(card);
    if (balance.balance < value) throw {type: 'insufficient_balance', message: "Saldo Insuficiente", statusCode: 403};
    await payment.insert({cardId, businessId, amount: value});
}