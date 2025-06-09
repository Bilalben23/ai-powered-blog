import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import useAxios from './useAxios';
import toast from 'react-hot-toast';
import { blogCategories } from '@constants/blogData';


const deleteBlogResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        _id: z.string(),
        category: z.enum(blogCategories)
    })
})


export default function useDeleteBlog() {
    const queryClient = useQueryClient();
    const axios = useAxios();

    return useMutation({
        mutationKey: ["deleteBlog"],
        mutationFn: async (blogId: string) => {
            const { data } = await axios.delete(`/v1/blogs/${blogId}`);

            const parsed = deleteBlogResponseSchema.safeParse(data);
            if (!parsed.success) {
                console.error("Delete blog response validation failed:", parsed.error.flatten());
                throw new Error("Invalid response format");
            }

            return parsed.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
            queryClient.invalidateQueries({ queryKey: ["blogs", "all"], exact: false });
            queryClient.invalidateQueries({ queryKey: ["blogs", data.data.category], exact: false });
            queryClient.removeQueries({ queryKey: ["blog", data.data._id] })
        }
    })

}
