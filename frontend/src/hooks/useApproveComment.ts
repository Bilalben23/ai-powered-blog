import { z } from 'zod';
import useAxios from './useAxios'
import { useMutation, useQueryClient } from '@tanstack/react-query';


const approveCommentResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        commentId: z.string(),
        blogId: z.string()
    })
})


export default function useApproveComment() {
    const axios = useAxios();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["approveComment"],
        mutationFn: async (commentId: string) => {
            const { data } = await axios.patch(`/v1/comments/${commentId}/approve`);

            const parsed = approveCommentResponse.safeParse(data);
            if (!parsed.success) {
                console.error("Response validation failed:", parsed.error.flatten());
                throw new Error("Invalid response format");
            }
            return parsed.data.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["adminComments"], exact: false });
            queryClient.invalidateQueries({ queryKey: ["approvedComments", data.blogId] });
        },
        onError: (error) => {
            console.error("Failed to approve comment:", error);
        }
    })
}
