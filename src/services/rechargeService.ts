import { cardValidationByDate } from "../middlewares/validationMiddleware.js";
import { Card } from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";


export default async function rechargeService(card : Card, value : number){
    if (!card.password) throw {type: 'inactive_card', message: 'Cartão ainda não está ativo', statusCode: 401}
    cardValidationByDate(card);
    const rechargeValues : rechargeRepository.RechargeInsertData = {cardId: card.id, amount : value}
    rechargeRepository.insert(rechargeValues);
}