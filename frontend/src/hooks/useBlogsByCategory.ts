import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axiosInstance from '@utils/axiosInstance';
import { blogsResponseSchema, type BlogCategory } from '@validations/blogsResponseSchema';


export type BlogCategoryFilter = "all" | BlogCategory;

type UseBlogsByCategoryParams = {
    category: BlogCategoryFilter;
    page?: number
}


export async function fetchBlogsByCategory(category: BlogCategoryFilter, page = 1) {

    const { data } = await axiosInstance.get(`/v1/blogs/category/${category}`, {
        params: {
            page
        }
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
