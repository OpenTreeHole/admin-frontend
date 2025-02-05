import { z } from "zod";

const defaultErrorResponseSchema = z.object({
    message: z.string()
});

export const getDecryptHistoryRequestSchema = z.object({
    identity_name: z.string() // actually 'recipient uid'
});

export const getDecryptHistorySuccessfulResponseSchema = z.array(z.object({
    pgp_message: z.string(),
    user_id: z.number()
}));

export const getDecryptHistorySchema = {
    name: 'get-decrypt-history',
    base: 'AUTH',
    path: '/shamir',
    method: 'GET',
    token: true,
    requestSchema: getDecryptHistoryRequestSchema,
    responseSchema: {
        success: {
            status: [200],
            schema: getDecryptHistorySuccessfulResponseSchema
        },
        fail: {
            status: [400, 403],
            schema: defaultErrorResponseSchema
        }
    }
} as const;

export const decryptRequestSchema = z.object({
    identity_name: z.string(),
    share: z.string(),
    user_id: z.number()
});

export const decryptSuccessfulResponseSchema = z.object({
    data: z.object({
        identity_names: z.array(z.string())
    }).optional(),
    message: z.string()
});

export const decryptSchema = {
    name: 'decrypt',
    base: 'AUTH',
    path: '/shamir/decrypt',
    method: 'POST',
    token: true,
    requestSchema: decryptRequestSchema,
    responseSchema: {
        success: {
            status: [200],
            schema: decryptSuccessfulResponseSchema
        },
        fail: {
            status: [400, 403],
            schema: defaultErrorResponseSchema
        }
    }
} as const;

export const getDecryptStatusRequestSchema = z.object({});

export const getDecryptStatusSuccessfulResponseSchema = z.object({
    shamir_upload_ready: z.boolean(),
    uploaded_shares_identity_names: z.array(z.string())
});

export const getDecryptStatusSchema = {
    name: 'get-decrypt-status',
    base: 'AUTH',
    path: '/shamir/decrypt/status/:user_id:',
    method: 'GET',
    token: true,
    requestSchema: getDecryptStatusRequestSchema,
    responseSchema: {
        success: {
            status: [200],
            schema: getDecryptStatusSuccessfulResponseSchema
        },
        fail: {
            status: [400, 403],
            schema: defaultErrorResponseSchema
        }
    }
} as const;

export const getDecryptedEmailRequestSchema = z.object({});

export const getDecryptedEmailSuccessfulResponseSchema = z.object({
    identity_names: z.array(z.string()),
    user_email: z.string(),
    user_id: z.number()
});

export const getDecryptedEmailSchema = {
    name: 'get-decrypt-email',
    base: 'AUTH',
    path: '/shamir/decrypt/:user_id:',
    method: 'GET',
    token: true,
    requestSchema: getDecryptedEmailRequestSchema,
    responseSchema: {
        success: {
            status: [200],
            schema: getDecryptedEmailSuccessfulResponseSchema
        },
        fail: {
            status: [400, 403],
            schema: defaultErrorResponseSchema
        }
    }
} as const;

export const getPGPMessageRequestSchema = z.object({
    identity_name: z.string()
});

export const getPGPMessageSuccessfulResponseSchema = z.object({
    pgp_message: z.string(),
    user_id: z.number()
});

export const getPGPMessageSchema = {
    name: 'get-pgp-message',
    base: 'AUTH',
    path: '/shamir/:user_id:',
    method: 'GET',
    token: true,
    requestSchema: getPGPMessageRequestSchema,
    responseSchema: {
        success: {
            status: [200],
            schema: getPGPMessageSuccessfulResponseSchema
        },
        fail: {
            status: [400, 403],
            schema: defaultErrorResponseSchema
        }
    }
} as const;
