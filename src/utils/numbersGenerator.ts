import { faker } from '@faker-js/faker';

export default function numbersGenerator(quant : number){
    const numbers = faker.random.numeric(quant)
    return numbers;
}