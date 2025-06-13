import { blogCategories } from "@/models/blogModel";
import { z } from "zod";


export const createBlogSchema = z.object({
    title: z.string({
        required_error: "Title is required"
    }).min(3, "Title must be at least 3 characters"),
    subTitle: z.string({
        required_error: "SubTitle is required"
    }).min(3, "SubTitle must be at least 3 characters"),
    description: z.string({
        required_error: "Description is required"
    }).min(10, "Description must be at least 10 characters"),
    category: z.enum(blogCategories, {
        required_error: "Category is required",
        message: `Category must be one of these: ${blogCategories.join(" | ")}`
    }),
    isPublished: z.union([
        z.boolean(),
        z.literal("true").transform(() => true),
        z.literal("false").transform(() => false),
    ])
        .catch(false)
        .default(false)
});

export const generateDescriptionSchema = z.object({
    prompt: z.string({ required_error: "Prompt text is required" })
        .trim()
        .min(10, "Prompt must be at least 10 characters"),
});


export const updateBlogSchema = createBlogSchema.partial();

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
