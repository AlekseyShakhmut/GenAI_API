import { test as base, APIRequestContext, request as playwrightRequest } from '@playwright/test';
import { config } from '../config/env';

type AuthFixtures = {
    apiAuth: APIRequestContext;
    apiWithoutAuth: APIRequestContext;
    apiInvalidAuth: APIRequestContext;
};

export const test = base.extend<AuthFixtures>({
    apiAuth: async ({}, use) => {
        const context = await playwrightRequest.newContext({
            baseURL: config.baseURL,
            extraHTTPHeaders: {
                Authorization: `Bearer ${config.apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        await use(context);
        await context.dispose();
    },

     apiInvalidAuth: async ({}, use) => {
        const context = await playwrightRequest.newContext({
            baseURL: config.baseURL,
            extraHTTPHeaders: {
                Authorization: `Bearer ${config.invalidApiKey}`,
                'Content-Type': 'application/json',
            },
        });

            await use(context);
            await context.dispose();
        },

    apiWithoutAuth: async ({}, use) => {
        const context = await playwrightRequest.newContext({
            baseURL: config.baseURL,
        });

        await use(context);
        await context.dispose();
    },
});

export const expect = test.expect;