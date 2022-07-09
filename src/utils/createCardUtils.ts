import { faker } from '@faker-js/faker';

export default async function createCard(){
    const cardNumber = await faker.random.numeric(16)
    return cardNumber;
}