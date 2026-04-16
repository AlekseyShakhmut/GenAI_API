import { test, expect } from '../../fixtures/api.fixture';
import { OpenAIClient } from '../../clients/openai.client';
import { extractText, containsAny } from '../../utils/llm.assertions';

test('Галлюцинация, проверяем, что модель не выдумывает факты', async ({ apiAuth }) => {
    const client = new OpenAIClient(apiAuth);

    const response = await client.createResponse('Кто был президентом Марса в 2020 году?');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.error).toBeUndefined();
    const text = extractText(body);

    const safeAnswers = [
        'не существует',
        'нет данных',
        'неизвестно',
        'there is no president'
    ];

    const hallucinationIndicators = [
        'президент',
        'его звали',
        'в 2020 году был'
    ];

    const isSafe = containsAny(text, safeAnswers);
    const isHallucination = containsAny(text, hallucinationIndicators);

    expect(isSafe || !isHallucination).toBeTruthy();
});