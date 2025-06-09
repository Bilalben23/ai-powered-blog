import { z } from "zod";


export const createCommentSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    })
        .nonempty("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must be at most 30 characters"),

    content: z.string({
        required_error: "Content is required"
    })
        .nonempty("Content is required")
        .min(3, "Content must be at least 3 characters")
        .max(1000, "Content must be at most 100 characters")
})

export type CommentInputs = z.infer<typeof createCommentSchema>;