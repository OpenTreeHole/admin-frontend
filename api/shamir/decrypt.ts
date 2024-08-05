const defaultErrorResponseSchema = {
    type: "object",
    required: ["message"],
    properties: {
        "message": { type: "string" }
    }
}

export const getDecryptHistoryRequestSchema = {
    type: "object",
    required: ["identity_name"],
    properties: {
        "identity_name": { type: "string" } // actually 'recipient uid'
    }
}

export const getDecryptHistorySuccessfulResponseSchema = {
    type: "array",
    items: {
        type: "object",
        required: ['user_id', 'pgp_message'],
        properties: {
            "pgp_message": { type: "string" },
            "user_id": { type: "number" }
        }
    }
}

// export const getDecryptHistoryErrorResponseSchema = {
//     type: "object",
//     required: ["code", "message"],
//     properties: {
//         "code": { type: "number" },
//         "message": { type: "string" }
//     }
// }

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
            // schema: getDecryptHistoryErrorResponseSchema
            schema: defaultErrorResponseSchema
        }
    }
}


export const decryptRequestSchema = {
    type: "object",
    required: ['identity_name', 'share', 'user_id'],
    properties: {
        "identity_name": { type: "string" },
        "share": { type: "string" },
        "user_id": { type: "number" }
    }
}

export const decryptSuccessfulResponseSchema = {
    type: "object",
    required: ['message'],
    properties: {
        "data": {
            type: "object",
            properties: {
                "identity_names": {
                    type: "array",
                    items: { type: "string" }
                }
            }
        },
        "message": { "type": "string" }
    }
}

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
}

export const getDecryptStatusRequestSchema = {
    type: 'object',
    required: [],
    properties: {}
}

export const getDecryptStatusSuccessfulResponseSchema = {
    type: 'object',
    required: ['shamir_upload_ready', 'uploaded_shares_identity_names'],
    properties: {
        "shamir_upload_ready": { type: "boolean" },
        "uploaded_shares_identity_names": { type: "array", items: { type: "string" } }
    }
}

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
}

export const getDecryptedEmailRequestSchema = {
    type: 'object',
    required: [],
    properties: {}
}

export const getDecryptedEmailSuccessfulResponseSchema = {
    type: 'object',
    required: ['identity_names', 'user_email', 'user_id'],
    properties: {
        "identity_names": { type: "array", items: { type: "string" } },
        "user_email": { type: "string" },
        "user_id": { type: "number" }
    }
}

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
}


export const getPGPMessageRequestSchema = {
    type: 'object',
    required: ['identity_name'],
    properties: {
        identity_name: { type: 'string' }
    }
}

export const getPGPMessageSuccessfulResponseSchema = {
    type: 'object',
    required: ['pgp_message'],
    properties: {
        "pgp_message": { type: "string" },
        "user_id": { type: "number" }
    }
}

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
}
