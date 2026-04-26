import { test, expect } from '../../fixtures/api.fixture';
import {OpenAIClient} from "../../clients/openai.client";

test.describe('Негативные тесты для POST/responses', () => {


test('POST /responses - без авторизации - возвращает 401', { tag: '@negative' }, async ({ apiWithoutAuth }) => {
    const client = new OpenAIClient(apiWithoutAuth);
    const res = await client.createResponse('Hello')

    expect(res.status()).toBe(401);
    const body = await res.json()
    expect(body.error).toBeDefined();
    expect(body.error.message).toContain("Missing bearer or basic authentication in header")

    });

    test('POST /responses - невалидный токен - возвращает 401', { tag: '@negative' }, async ({ apiInvalidAuth }) => {
        const client = new OpenAIClient(apiInvalidAuth);
        const res = await client.createResponse('Hello')

        expect(res.status()).toBe(401);
        const body = await res.json()
        expect(body.error).toBeDefined();
        expect(body.error.message).toContain("Incorrect API key provided")
    });

    test('POST /responses - отсутствует обязательное поле model - возвращает 400', { tag: '@negative' }, async ({ apiAuth }) => {
        const res = await apiAuth.post('responses', {
            data: {
                // model: 'gpt-4.1',
                input: 'Hello',
            },
        });

        expect(res.status()).toBe(400);
        const body = await res.json()
        expect(body.error).toBeDefined();
        expect(body.error.message).toContain('model');
    });

    test('POST /responses - указана несуществующая модель - возвращает 400', { tag: '@negative' }, async ({ apiAuth }) => {
        const client = new OpenAIClient(apiAuth)
        const res = await client.createResponse('Hello',{model: 'non-existent-model'})

        expect(res.status()).toBe(400);
        const body = await res.json()
        expect(body.error).toBeDefined();
        expect(body.error.message).toContain("non-existent-model")
    });

    test('POST /responses - отсутствует обязательное поле input - возвращает 400', { tag: '@negative' }, async ({ apiAuth }) => {
        const res = await apiAuth.post('responses', {
            data: {
                model: 'gpt-4.1',
                // input: 'Hello',
            },
        });

        expect(res.status()).toBe(400);
        const body = await res.json()
        expect(body.error).toBeDefined();
        expect(body.error.message).toContain("input")
    });

    test('POST /responses - пустое значение input - возвращает 400', { tag: '@negative' }, async ({ apiAuth }) => {
        const client = new OpenAIClient(apiAuth)
        const res = await client.createResponse('')

        expect(res.status()).toBe(400);
        const body = await res.json()
        expect(body.error).toBeDefined();
        expect(body.error.message).toContain("One of \"input\" or \"previous_response_id\"or 'prompt'or 'conversation_id' must be provided.")
    });
    //тест
    test('POST /responses - превышена квота (недостаточно токенов) - возвращает 429', { tag: '@negative' }, async ({ apiAuth }) => {
        const client = new OpenAIClient(apiAuth)
        const res = await client.createResponse('Tell me a three sentence bedtime story about a unicorn.')

        expect(res.status()).toBe(429);
        const body = await res.json()
        expect(body.error).toBeDefined();
        expect(body.error.message).toContain('You exceeded your current quota')
    });
})