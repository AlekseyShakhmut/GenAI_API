import { APIRequestContext } from '@playwright/test';

export type ResponseOptions = {
    model: string;
    temperature?: number;
    max_tokens?: number;
};

export class OpenAIClient {
     request: APIRequestContext

    constructor(request: APIRequestContext) {
         this.request = request;
    }

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