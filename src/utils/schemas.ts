import joi, { Schema } from "joi";

export const cardTypeSchema : Schema = joi.object({
  employeeId: joi.number().required(),
  type: joi.valid('groceries', 'restaurant', 'transport', 'education', 'health')
});

export const activateCardSchema : Schema = joi.object({
  number: joi.string().length(16).required(),
  cardholderName: joi.string().required(),
  expirationDate: joi.string().required(),
  cvc: joi.string().length(3).required(),
  password: joi.string().length(4).required()
});