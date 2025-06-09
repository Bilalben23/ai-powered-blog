import { blogCategories } from '@constants/blogData';
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@utils/axiosInstance'
import { z } from 'zod';

const blogSchema = z.object({
    _id: z.string(),
    author: z.object({
        _id: z.string(),
        name: z.string()
    }),
    title: z.string(),
    subTitle: z.string(),
    description: z.string(),
    image: z.string().url(),
    category: z.enum(blogCategories),
    createdAt: z.string()
});

const blogResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: blogSchema
})


export default function useBlogById(blogId: string) {
    return useQuery({
        queryKey: ["blog", blogId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/v1/blogs/${blogId}`);

            const parsed = blogResponseSchema.safeParse(data);
            if (!parsed.success) {
                console.error("Response validation failed:", parsed.error.flatten());
                throw new Error("Invalid response data");
            }

            return parsed.data.data
        },
        enabled: !!blogId
    })
}
