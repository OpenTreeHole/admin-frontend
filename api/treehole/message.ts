import { z } from "zod";

const sendMessageRequestSchema = z.object({
    description: z.string(),
    recipients: z.array(z.number())
});

export const sendMessageResponseSchema = z.object({});

export const sendMessageSchema = {
    name: 'sendMessage',
    base: 'TREEHOLE',
    path: '/messages',
    method: 'POST',
    token: true,
    requestSchema: sendMessageRequestSchema,
    responseSchema: {
        success: {
            status: [201],
            schema: sendMessageResponseSchema
        }
    }
} as const;
