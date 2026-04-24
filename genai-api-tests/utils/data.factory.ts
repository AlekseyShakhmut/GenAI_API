import { faker } from '@faker-js/faker';

export function generatePrompt() {
    const prompts = [
        `Tell me a joke about ${faker.animal.type()}`,
        `What is the capital of ${faker.location.country()}?`,
        `Describe ${faker.commerce.productName()} in one sentence`,
        `Write a short greeting to ${faker.person.firstName()}`,
        `What color is ${faker.vehicle.color()} car?`,
        `Explain ${faker.lorem.word()} like I'm 5 years old`,
        `Generate a random fact about ${faker.science.chemicalElement().name}`
    ];

    return prompts[Math.floor(Math.random() * prompts.length)];
}