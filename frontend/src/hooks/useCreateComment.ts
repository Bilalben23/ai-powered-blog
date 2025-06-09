import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@utils/axiosInstance";
import { z } from "zod";

const commentResponseSchema = z.object({
    success: z.boolean(),
    message: z.string()
})

type CreateCommentInput = {
    name: string,
    content: string
}

export default function useCreateComment(blogId: string) {
    return useMutation({
        mutationKey: ["createComment", blogId],
        mutationFn: async (commentData: CreateCommentInput) => {
            const { data } = await axiosInstance.post(`/v1/comments/${blogId}`, commentData);

            const parsed = commentResponseSchema.safeParse(data);
            if (!parsed.success) {
                console.error('Invalid comment response:', parsed.error.flatten());
                throw new Error('Invalid response data');
            }

            return parsed.data
        }
    })
}
