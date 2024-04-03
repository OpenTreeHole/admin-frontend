export const loginRequestSchema = {
    type: "object",
    required: ['email', 'password'],
    properties: {
        email: { type: "string" },
        password: { type: "string" }
    }
}

export const loginSuccessfulResponseSchema = {
    type: "object",
    required: ['access', 'refresh', 'message'],
    properties: {
        access: { type: "string" },
        refresh: { type: "string" },
        message: { type: "string" }
    }
}

export const loginFailedResponseSchema = {
    type: "object",
    required: ['code', 'message'],
    properties: {
        code: { type: "number" },
        message: { type: "string" },
        detail: { type: "array" }
    }
}

export const loginSchema = {
    name: 'login',
    base: 'AUTH',
    path: '/login',
    method: 'POST',
    token: false,
    requestSchema: loginRequestSchema,
    responseSchema: {
        success: {
            status: [200],
            schema: loginSuccessfulResponseSchema,
        },
        fail: {
            status: [400, 401],
            schema: loginFailedResponseSchema
        }
    }
}
