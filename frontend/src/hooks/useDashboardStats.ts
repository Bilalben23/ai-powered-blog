import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { z } from 'zod';

const blogSchema = z.object({
    _id: z.string(),
    title: z.string(),
    isPublished: z.boolean(),
    createdAt: z.string()
})

export type Blog = z.infer<typeof blogSchema>;

const dashboardStatsSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        totalBlogs: z.number(),
        totalComments: z.number(),
        totalDrafts: z.number(),
        latestBlogs: z.array(blogSchema)
    })
})


export default function useDashboardStats() {
    const axios = useAxios();

    return useQuery({
        queryKey: ["dashboardStats"],
        queryFn: async () => {
            const { data } = await axios.get("/v1/blogs/dashboard");

            const parsed = dashboardStatsSchema.safeParse(data);
            if (!parsed.success) {
                console.error("Dashboard stats response invalid", parsed.error.flatten());
                throw new Error("Invalid dashboard data");
            }

            return parsed.data.data;
        }
    })
}
