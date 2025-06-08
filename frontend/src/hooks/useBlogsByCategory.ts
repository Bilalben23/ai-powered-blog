import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axiosInstance from '@utils/axiosInstance';
import { blogsResponseSchema, type Category } from '@validations/blogsResponseSchema';


type UseBlogsByCategoryParams = {
    category: Category;
    page?: number
}


export default function useBlogsByCategory({ category, page = 1 }: UseBlogsByCategoryParams) {
    return useQuery({
        queryKey: ["blogs", category, page],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/v1/blogs/category/${category}`, {
                params: {
                    page
                }
            });

            const parsed = blogsResponseSchema.safeParse(data);
            if (!parsed.success) {
                console.error("Response validation failed:", parsed.error.format());
                throw new Error("Invalid response data");
            }
            return parsed.data;
        },
        placeholderData: keepPreviousData

    })
}
