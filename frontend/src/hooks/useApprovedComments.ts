import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@utils/axiosInstance";
import { z } from "zod";

const commentSchema = z.object({
    _id: z.string(),
    name: z.string(),
    content: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type Comment = z.infer<typeof commentSchema>;


const approvedCommentsResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(commentSchema)
})

export default function useApprovedComments(blogId?: string) {
    return useQuery({
        queryKey: ["approvedComments", blogId],
        queryFn: async () => {
            const { data } = await axiosInstance(`/v1/comments/blog/${blogId}`);

            const parsed = approvedCommentsResponseSchema.safeParse(data);
            if (!parsed.success) {
                console.error("Response validation failed:", parsed.error.flatten());
                throw new Error("Invalid response format");
            }

            return parsed.data.data;
        },
        enabled: !!blogId
    })
}
