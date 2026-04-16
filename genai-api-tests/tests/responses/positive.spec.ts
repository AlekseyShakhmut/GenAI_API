import { test, expect } from '../../fixtures/api.fixture';
import { OpenAIClient } from '../../clients/openai.client';

test('Позитивный сценарий, код ответа 200 и наличие в ответе ключа output', async ({ apiAuth }) => {
    const client = new OpenAIClient(apiAuth);

    const res = await client.createResponse('Hello');

    expect(res.status()).toBe(200);

    const body = await res.json();

    expect(body).toHaveProperty('output');
});