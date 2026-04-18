export const config = {
    baseURL: process.env.API_BASE_URL || 'https://api.openai.com/v1/',
    apiKey: process.env.OPENAI_API_KEY,
    invalidApiKey: process.env.INVALID_API_KEY || 'sk-invalid-key',
};