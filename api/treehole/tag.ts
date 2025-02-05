import { z } from "zod";

const TagInfoSchema = z.object({
    id: z.number(),
    name: z.string(),
    temperature: z.number(),
    is_zzmg: z.boolean(),
    is_sensitive: z.boolean(),
    is_actual_sensitive: z.boolean(),
    tag_id: z.number()
});

export const tagListRequestSchema = z.object({});

export const tagListSuccessfulResponseSchema = z.array(TagInfoSchema);

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
} as const;

export const tagCreateRequestSchema = z.object({
    name: z.string()
});

export const tagCreateSuccessfulResponseSchema = TagInfoSchema;

export const tagCreateSchema = {
    name: 'tag-create',
    base: 'TREEHOLE',
    path: '/tags',
    method: 'POST',
    token: true,
    requestSchema: tagCreateRequestSchema,
    responseSchema: {
        success: {
            status: [200, 201],
            schema: tagCreateSuccessfulResponseSchema
        }
    }
} as const;

export const tagDeleteRequestSchema = z.object({
    to: z.string()
});

export const tagDeleteResponseSchema = TagInfoSchema;

export const tagDeleteSchema = {
    name: 'tag-delete',
    base: 'TREEHOLE',
    path: '/tags/:id:',
    method: 'DELETE',
    token: true,
    requestSchema: tagDeleteRequestSchema,
    responseSchema: {
        success: {
            status: [200],
            schema: tagDeleteResponseSchema
        }
    }
} as const;
