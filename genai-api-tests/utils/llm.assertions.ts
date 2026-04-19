export function extractText(body: any): string {
    return body.output?.[0]?.content?.[0]?.text || '';
}

export function containsAny(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
}