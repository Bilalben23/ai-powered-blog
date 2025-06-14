import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { z } from "zod";


const TogglePublishResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        _id: z.string(),
        category: z.string(),
        isPublished: z.boolean()
    })
})

export default function useTogglePublish({ page = 1 }: { page?: number }) {
    const queryClient = useQueryClient();
    const axios = useAxios();

    return useMutation({
        mutationKey: ["togglePublish"],
        mutationFn: async (blogId: string) => {
            const { data } = await axios.patch(`/v1/blogs/${blogId}/publish`);

            const parsed = TogglePublishResponse.safeParse(data);
            if (!parsed.success) {
                console.error("Response validation failed:", parsed.error.flatten());
                throw new Error("Invalid response format");
            }
            return parsed.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
            queryClient.invalidateQueries({ queryKey: ["blogs", "all"], exact: false });
            queryClient.invalidateQueries({ queryKey: ["blogs", data.data.category], exact: false });
            queryClient.invalidateQueries({ queryKey: ["authorBlogs", page] });

            if (!data.data.isPublished) {
                queryClient.removeQueries({ queryKey: ["blog", data.data._id] });
            }
        }
    })
}
