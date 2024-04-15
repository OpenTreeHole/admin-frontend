const TagInfoSchema = {
    "id": { type: "number" },
    "name": { type: "string" },
    "temperature": { type: "number" },
    "is_zzmg": { type: "boolean" },
    "is_sensitive": { type: "boolean" },
    "is_actual_sensitive": { type: "boolean" },
    "tag_id": { type: "number" }
}

export const tagListRequestSchema = {
    type: "object",
    required: [],
    properties: {}
}

export const tagListSuccessfulResponseSchema = {
    type: "array",
    items: {
        type: "object",
        required: ['id', 'name', 'temperature'],
        properties: TagInfoSchema
    }
}

export const tagListSchema = {
    name: 'tag-list',
    base: 'TREEHOLE',
    path: '/tags',
    method: 'GET',
    token: true,
    requestSchema: tagListRequestSchema,
    responseSchema: {
        success: {
            status: [200],
            schema: tagListSuccessfulResponseSchema
        }
    }
}

export const tagCreateRequestSchema = {
    type: "object",
    required: ['name'],
    properties: {
        "name": { type: "string" }
    }
}

export const tagCreateSuccessfulResponseSchema = {
    type: "object",
    required: ['id', 'name'],
    properties: TagInfoSchema
}

export const tagCreateSchema = {
    name: 'tag-create',
    base: 'TREEHOLE',
    path: '/tags',
    method: 'CREATE',
    token: true,
    requestSchema: tagCreateRequestSchema,
    responseSchema: {
        success: {
            status: [200],
            schema: tagCreateSuccessfulResponseSchema
        }
    }
}

export const tagDeleteRequestSchema = {
    type: "object",
    required: ['to'],
    properties: {
        "to": { type: "string" }
    }
}

export const tagDeleteResponseSchema = {
    type: "object",
    required: ['id', 'name'],
    properties: TagInfoSchema
}

export const tagDeleteSchema = {
    name: 'tag-delete',
    base: 'TREEHOLE',
    // /api/tags/:id
}