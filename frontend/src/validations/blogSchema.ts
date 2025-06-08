import { blogCategories } from "@constants/blogData";
import { z } from "zod";

export const blogSchema = z.object({
    thumbnail: z.instanceof(File, {
        message: "Thumbnail is required"
    }),
    title: z.string()
        .trim()
        .min(3, "Title must be at least 3 characters"),
    subtitle: z.string()
        .trim()
        .min(3, "Subtitle must be at least 3 characters"),
    category: z.enum(blogCategories as [string, ...string[]], {
        message: `Category must be one of these: ${blogCategories.join(" | ")}`
    }),
    isPublished: z.boolean(),
    description: z.string()
        .trim()
        .min(10, 'Description must be at least 10 characters')
})


export type BlogFormInputs = z.infer<typeof blogSchema>;
