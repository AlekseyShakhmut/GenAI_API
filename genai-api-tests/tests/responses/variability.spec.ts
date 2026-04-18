import { test, expect } from '../../fixtures/api.fixture';
import { OpenAIClient } from '../../clients/openai.client';

test('Проверяем, что модель даёт разные ответы при повышенной температуре', async ({ apiAuth }) => {
    const client = new OpenAIClient(apiAuth);

    const response1 = await client.createResponse('Tell a joke', { temperature: 1 });
    const response2 = await client.createResponse('Tell a joke', { temperature: 1 });

    const body1 = await response1.json();
    const body2 = await response2.json();

    const joke1 = body1.output[0].content[0].text;
    const joke2 = body2.output[0].content[0].text;

    expect(joke1).not.toEqual(joke2);
  
});