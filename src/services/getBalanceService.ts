import { Card } from "../repositories/cardRepository";
import * as payment from "../repositories/paymentRepository.js";
import * as recharge from "../repositories/rechargeRepository.js";

export const getBalanceService = async (card : Card) =>{
    const recharges = await recharge.findByCardId(card.id);
    const transactions = await payment.findByCardId(card.id);
    let sum : number = 0;
    transactions.forEach((el)=>{
      sum -= el.amount;
    });
    recharges.forEach((el)=>{
      sum += el.amount;
    })
    const balance = {
        "balance": sum,
        "transactions": transactions,
        "recharges": recharges
      }

    return balance;
}