import { blogCategories, type BlogCategory } from '@constants/categories';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axiosInstance from '@utils/axiosInstance';
import { z } from "zod";


const blogSchema = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.enum(blogCategories),
    image: z.string().url()
})


const paginationSchema = z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean()
})

const blogsResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(blogSchema),
    pagination: paginationSchema
})

export type BlogCategoryFilter = "all" | BlogCategory;

type UseBlogsByCategoryParams = {
    category: BlogCategoryFilter;
    page?: number
}


export async function fetchBlogsByCategory(category: BlogCategoryFilter, page = 1) {

    const { data } = await axiosInstance.get(`/v1/blogs/category/${category}`, {
        params: { page }
    });

    const parsed = blogsResponseSchema.safeParse(data);
    if (!parsed.success) {
        console.error("Response validation failed:", parsed.error.flatten());
        throw new Error("Invalid response data");
    }
    return {
        blogs: parsed.data.data,
        pagination: parsed.data.pagination
    };
}


export default function useBlogsByCategory({ category, page = 1 }: UseBlogsByCategoryParams) {
    return useQuery({
        queryKey: ["blogs", category, page],
        queryFn: () => fetchBlogsByCategory(category, page),
        placeholderData: keepPreviousData,
        enabled: !!category
    })
}
