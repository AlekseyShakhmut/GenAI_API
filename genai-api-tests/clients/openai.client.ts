import { APIRequestContext } from '@playwright/test';

export class OpenAIClient {
    constructor(private request: APIRequestContext) {}

    async createResponse(input: string, options = {}) {
        return await this.request.post('responses', {
            data: {
                model: 'gpt-4.1',
                input,
                ...options,
            },
        });
    }
}