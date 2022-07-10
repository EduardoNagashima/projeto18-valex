import joi from "joi";

export const cardTypeSchema : any = joi.object({
  employeeId: joi.number().required(),
  type: joi.valid('groceries', 'restaurant', 'transport', 'education', 'health')
});