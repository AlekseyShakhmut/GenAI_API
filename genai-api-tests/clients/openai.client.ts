import { APIRequestContext } from '@playwright/test';

export class OpenAIClient {
    constructor(private request: APIRequestContext) {}

    async createResponse(input: string, options: any = {}) {
        return await this.request.post('responses', {
            data: {
                model: options.model || 'gpt-4.1',
                input,
                ...options,
            },
        });
    }
}