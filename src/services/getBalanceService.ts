import { Card } from "../repositories/cardRepository";
import * as payment from "../repositories/paymentRepository.js";
import * as recharge from "../repositories/rechargeRepository.js";

export const getBalanceService = async (card : Card) =>{
    const recharges = await recharge.findByCardId(card.id);
    const transactions = await payment.findByCardId(card.id);

    const balance = {
        "balance": 35000,
        "transactions": transactions,
        "recharges": recharges
      }

    return balance;
}