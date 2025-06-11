import type { AxiosInstance } from 'axios';
import useAxios from './useAxios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { z } from 'zod';


const commentSchema = z.object({
    _id: z.string(),
    blog: z.object({
        _id: z.string(),
        title: z.string()
    }),
    name: z.string(),
    content: z.string(),
    isApproved: z.boolean(),
    createdAt: z.string()
})

const paginationSchema = z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean()
});


const commentsResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(commentSchema),
    pagination: paginationSchema
});

type AdminCommentsParams = {
    isApproved?: boolean;
    page?: number
}

export type Comment = z.infer<typeof commentSchema>;


export async function fetchAdminComments(axiosInstance: AxiosInstance, { isApproved = true, page = 1 }: AdminCommentsParams = {}) {

    const { data } = await axiosInstance.get("/v1/comments", {
        params: { isApproved, page }
    })

    const parsed = commentsResponseSchema.safeParse(data);
    if (!parsed.success) {
        console.error("Admin comments response validation failed:", parsed.error.flatten());
        throw new Error("Invalid admin comments data");
    }

    return {
        comments: parsed.data.data,
        pagination: parsed.data.pagination
    }
}


export default function useAdminComments(params: AdminCommentsParams = {}) {
    const { isApproved = true, page = 1 } = params;
    const axios = useAxios();

    return useQuery({
        queryKey: ["adminComments", isApproved, page],
        queryFn: () => fetchAdminComments(axios, { isApproved, page }),
        placeholderData: keepPreviousData
    })
}
