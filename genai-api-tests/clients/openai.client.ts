import { APIRequestContext } from '@playwright/test';

export type ResponseOptions = {
    model: string;
    temperature?: number;
    max_tokens?: number;
};

export class OpenAIClient {
    constructor (private request: APIRequestContext) {}

    async createResponse(input: string, options: Partial<ResponseOptions> = {}) {
        return await this.request.post('responses', {
            data: {
                model: options.model || 'gpt-4.1',
                input,
                ...options,
            },
        });
    }
}