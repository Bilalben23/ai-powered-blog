import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";
import type { BlogFormInputs } from "@validations/blogSchema";
import { z } from "zod";
import { blogCategories } from "@constants/categories";


const CreateBlogResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        _id: z.string(),
        category: z.enum(blogCategories)
    })
})


export default function useCreateBlog() {
    const axios = useAxios();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["createBlog"],
        mutationFn: async (blogData: BlogFormInputs) => {
            const formData = new FormData();
            formData.append("image", blogData.thumbnail);
            formData.append("title", blogData.title);
            formData.append("subTitle", blogData.subTitle);
            formData.append("description", blogData.description);
            formData.append("category", blogData.category);
            formData.append("isPublished", blogData.isPublished.toString());

            const { data } = await axios.post("/v1/blogs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const parsed = CreateBlogResponse.safeParse(data);
            if (!parsed.success) {
                console.error("Invalid blog creation response:", parsed.error.format());
                throw new Error("Invalid response from server.");
            }

            return parsed.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
            queryClient.invalidateQueries({ queryKey: ["blogs", "all"], exact: false });
            queryClient.invalidateQueries({ queryKey: ["blogs", data.data.category], exact: false });
            queryClient.invalidateQueries({ queryKey: ["authorBlogs"], exact: false });
        }
    })
}
