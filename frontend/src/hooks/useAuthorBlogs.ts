import type { AxiosInstance } from "axios";
import { z } from "zod";
import useAxios from "./useAxios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const blogSchema = z.object({
    _id: z.string(),
    title: z.string(),
    isPublished: z.boolean(),
    createdAt: z.string(),
});

const paginationSchema = z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
});

const authorBlogsResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(blogSchema),
    pagination: paginationSchema,
});


export async function fetchAuthorBlogs(axiosInstance: AxiosInstance, page = 1) {
    const { data } = await axiosInstance.get("/v1/blogs/author", {
        params: { page },
    });

    const parsed = authorBlogsResponseSchema.safeParse(data);
    if (!parsed.success) {
        console.error("Response validation failed:", parsed.error.flatten());
        throw new Error("Invalid author blogs data");
    }

    return {
        blogs: parsed.data.data,
        pagination: parsed.data.pagination
    };
}


export default function useAuthorBlogs(page = 1) {
    const axios = useAxios();

    return useQuery({
        queryKey: ["authorBlogs", page],
        queryFn: () => fetchAuthorBlogs(axios, page),
        placeholderData: keepPreviousData
    });
}