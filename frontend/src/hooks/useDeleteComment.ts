import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios';
import { z } from 'zod';


const deleteCommentResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        _id: z.string(),
        blogId: z.string(),
        isApproved: z.string()
    })
})


export default function useDeleteComment() {
    const axios = useAxios();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deleteComment"],
        mutationFn: async (commentId: string) => {
            const { data } = await axios.delete(`/v1/comments&/${commentId}`);

            const parsed = deleteCommentResponse.safeParse(data);
            if (!parsed.success) {
                console.error('Response validation failed:', parsed.error.flatten());
                throw new Error('Invalid response format');
            }
            return parsed.data.data;
        },
        onSuccess: (data) => {
            if (data.isApproved) {
                queryClient.invalidateQueries({ queryKey: ["adminComments", true], exact: false });
                queryClient.invalidateQueries({ queryKey: ["approvedComments",] });
            } else {
                queryClient.invalidateQueries({ queryKey: ["adminComments", false], exact: false })
            }
        }
    })
}
