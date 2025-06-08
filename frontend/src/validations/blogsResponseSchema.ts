import { z } from "zod";

export const blogCategories = ['technology', 'startup', 'lifestyle', 'finance'] as const;
export type BlogCategory = typeof blogCategories[number];


export const blogSchema = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.enum(blogCategories),
    image: z.string().url()
})


export const paginationSchema = z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean()
})


export const blogsResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(blogSchema),
    pagination: paginationSchema
})