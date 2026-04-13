import { test, expect } from '../../fixtures/api.fixture';
import { OpenAIClient } from '../../clients/openai.client';

test('should produce different outputs with high temperature', async ({ apiAuth }) => {
    const client = new OpenAIClient(apiAuth);

    const r1 = await client.createResponse('Tell a joke', { temperature: 1 });
    const r2 = await client.createResponse('Tell a joke', { temperature: 1 });

    const b1 = await r1.json();
    const b2 = await r2.json();

    const t1 = b1.output[0].content[0].text;
    const t2 = b2.output[0].content[0].text;

    expect(t1).not.toEqual(t2);
  
});