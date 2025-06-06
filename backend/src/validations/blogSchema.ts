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
    category: z.enum(blogCategories as [string, ...string[]], {
        required_error: "Category is required"
    }),
    image: z.string({
        required_error: "Image is required"
    }).url("Image must be a valid URL"),
    isPublished: z.boolean().optional()
});

export const updateBlogSchema = createBlogSchema.partial();

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
