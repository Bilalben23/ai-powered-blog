import { z } from "zod";


export const createCommentSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    })
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must be at most 30 characters"),

    content: z.string({
        required_error: "Content is required",
        invalid_type_error: "Content must be a string"
    })
        .min(3, "Content must be at least 3 characters")
        .max(1000, "Content must be at most 100 characters"),
    isApproved: z.boolean().optional()
})

export type CreateCommentInput = z.infer<typeof createCommentSchema>;