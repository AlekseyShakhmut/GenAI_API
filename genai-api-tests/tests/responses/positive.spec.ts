import { test, expect } from '../../fixtures/api.fixture';
import { OpenAIClient } from '../../clients/openai.client';

test('should return 200 and valid response', async ({ apiAuth }) => {
    const client = new OpenAIClient(apiAuth);

    const res = await client.createResponse('Hello');

    expect(res.status()).toBe(200);

    const body = await res.json();

    expect(body).toHaveProperty('output');
});