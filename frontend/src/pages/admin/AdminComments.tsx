import { CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from 'react';
import CommentRow from '@components/admin/CommentRow';
import useAdminComments, { fetchAdminComments } from '@hooks/useAdminComments';
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useAxios from "@hooks/useAxios";


export default function AdminComments() {
    const queryClient = useQueryClient();
    const axios = useAxios();

    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const [page, setPage] = useState<number>(initialPage);

    const [isApproved, setIsApproved] = useState(true);

    const { data, isLoading, isError, error, isPlaceholderData } = useAdminComments({ isApproved, page });
    const comments = data?.comments;
    const pagination = data?.pagination;



    useEffect(() => {
        if (!isPlaceholderData && pagination && pagination.hasNextPage) {
            queryClient.prefetchQuery({
                queryKey: ["adminComments", isApproved, page + 1],
                queryFn: () => fetchAdminComments(axios, { isApproved, page: page + 1 })
            })
        }
    }, [queryClient, pagination?.hasNextPage, isPlaceholderData, page])


    useEffect(() => {
        setSearchParams({ page: String(page), isApproved: String(isApproved) });
    }, [page, isApproved])


    return (
        <section className='flex-1 w-full p-3 sm:p-6 md:p-10'>
            <div className='flex items-center justify-between w-full md:max-w-5xl'>
                <h1 className='font-medium text-gray-600'>Comments</h1>

                <div className="flex items-center gap-3 mt-4">
                    <button
                        type="button"
                        onClick={() => setIsApproved(true)}
                        className={`flex items-center gap-2 cursor-pointer px-4 py-1.5 text-xs border rounded-full shadow transition-all duration-200 ${isApproved
                            ? "bg-primary/10 text-primary border-primary"
                            : "text-gray-600 bg-white border-gray-300"
                            }`}
                    >
                        <CheckCircle className="size-4" />
                        Approved
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsApproved(false)}
                        className={`flex items-center gap-2 px-4 py-1.5 text-xs border rounded-full shadow transition-all cursor-pointer duration-200 ${isApproved
                            ? "text-gray-600 bg-white border-gray-300"
                            : "bg-red-100 text-red-600 border-red-400"

                            }`}
                    >
                        <XCircle className="size-4" />
                        Not Approved
                    </button>
                </div>
            </div>

            <div className="relative max-w-full mt-5 overflow-x-auto bg-white rounded-lg shadow md:max-w-5xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th scope="col" className="p-4 font-medium">
                                BLOG TITLE & COMMENT
                            </th>

                            <th scope="col" className="p-4 font-medium max-sm:hidden">
                                DATE
                            </th>
                            <th scope="col" className="p-4 font-medium text-end">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ?
                                <tr>
                                    <td colSpan={3} className="p-4 text-center text-gray-500">
                                        Loading...
                                    </td>
                                </tr>
                                : comments?.map(comment => (
                                    <CommentRow
                                        key={comment._id}
                                        comment={comment}
                                    />
                                ))
                        }
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className='mt-10 flex justify-center items-center md:max-w-5xl max-w-full gap-2 flex-wrap'>
                    {Array.from({ length: pagination.totalPages }).map((_, i) => {
                        const pageNum = i + 1;
                        return (
                            <button
                                key={pageNum}
                                type='button'
                                onClick={() => setPage(pageNum)}
                                disabled={isLoading || pageNum === page}
                                className={`size-10 rounded-full flex items-center cursor-pointer justify-center border text-sm font-medium transition ${pageNum === page
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-gray-100 text-gray-600'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>
            )}

        </section>
    )
}
