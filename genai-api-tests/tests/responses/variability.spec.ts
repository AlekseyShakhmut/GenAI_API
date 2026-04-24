import { test, expect } from '../../fixtures/api.fixture';
import {OpenAIClient} from '../../clients/openai.client';
import {extractText} from "../../utils/llm.assertions";

test.describe('Тесты на недетерминированность', () => {
    const prompt = 'Расскажи шутку'

    test('Проверка, что модель даёт разные ответы при повышенной температуре', async ({ apiAuth }) => {
        const client = new OpenAIClient(apiAuth);

        const response1 = await client.createResponse(prompt, { temperature: 1 });
        const response2 = await client.createResponse(prompt, { temperature: 1 });

        expect(response1.status()).toBe(200);
        expect(response2.status()).toBe(200);

        const body1 = await response1.json();
        const body2 = await response2.json();

        const joke1 = extractText(body1);
        const joke2 = extractText(body2);

        expect(joke1).not.toBe(joke2);
        expect(joke1).toBeGreaterThan(5);
        expect(joke2).toBeGreaterThan(5);
  
    });

    test('Проверка, что при низкой температуре ответы идентичны', async ({apiAuth}) => {
        const client = new OpenAIClient(apiAuth);

        const response1 = await client.createResponse(prompt, {temperature: 0});
        const response2 = await client.createResponse(prompt, {temperature: 0});

        expect(response1.status()).toBe(200)
        expect(response2.status()).toBe(200)

        const body1 = await response1.json();
        const body2 = await response2.json();

        const joke1 = extractText(body1);
        const joke2 = extractText(body2);

        expect(joke1).toEqual(joke2)
    })
})