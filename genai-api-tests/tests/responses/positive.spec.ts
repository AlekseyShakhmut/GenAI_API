import { test, expect } from '../../fixtures/api.fixture';
import { OpenAIClient } from '../../clients/openai.client';
import {generatePrompt} from "../../utils/data.factory";

test('Позитивный сценарий, код ответа 200 и наличие в ответе ключа output', async ({ apiAuth }) => {
    const client = new OpenAIClient(apiAuth);

    const res = await client.createResponse(generatePrompt());

    expect(res.status()).toBe(200);

    const body = await res.json();

    expect(body).toHaveProperty('output');
    expect(body.output).toBeInstanceOf(Array);
    expect(body.output.length).toBeGreaterThan(0);
    expect(body.error).toBeUndefined();

});