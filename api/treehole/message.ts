export const sendMessageRequestSchema = {
    type: 'object',
    required: ["description", "recipients"],
    properties: {
        description: { type: 'string' },
        recipients: { type: 'array', items: { type: 'number' } }
    }
}

export const sendMessageResponseSchema = {
    type: 'object',
    required: [],
    properties: {}
}

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
}
