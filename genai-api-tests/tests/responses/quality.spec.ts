import { test, expect } from '../../fixtures/api.fixture';
import { OpenAIClient } from '../../clients/openai.client';
import { extractText, containsAny } from '../../utils/llm.assertions';

test('Проверка на качество ответа (длина, ключевые слова)', async ({ apiAuth }) => {
    const client = new OpenAIClient(apiAuth);

    const response = await client.createResponse('Что такое API тестирование? Объясни кратко');

    const body = await response.json();
    const text = extractText(body);

    const keywords = [
        'api',
        'тест',
        'запрос',
        'ответ',
        'сервер'
    ];

    // Ответ не пустой
    expect(text.length).toBeGreaterThan(20);

    // Есть релевантные слова
    expect(containsAny(text, keywords)).toBeTruthy();

    expect(text.length).toBeLessThan(500);
});