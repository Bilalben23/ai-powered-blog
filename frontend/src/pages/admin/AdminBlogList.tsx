import BlogTable from '@components/admin/BlogTable';
import useAuthorBlogs, { fetchAuthorBlogs } from '@hooks/useAuthorBlogs';
import useAxios from '@hooks/useAxios';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';


export default function AdminBlogList() {
    const axios = useAxios();
    const queryClient = useQueryClient();

    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const [page, setPage] = useState<number>(initialPage);

    const { data, isError, isLoading, error, isPlaceholderData } = useAuthorBlogs(page);
    const blogs = data?.blogs;
    const pagination = data?.pagination;

    useEffect(() => {
        setSearchParams({ page: String(page) });
    }, [page]);

    useEffect(() => {
        if (!isPlaceholderData && pagination && pagination.hasNextPage) {
            queryClient.prefetchQuery({
                queryKey: ["authorBlogs", page + 1],
                queryFn: () => fetchAuthorBlogs(axios, page + 1)
            })
        }
    }, [queryClient, pagination?.hasNextPage, isPlaceholderData, page])


    return (
        <section className='flex-1 w-full p-3 sm:p-6 md:p-10'>
            <h1 className='mb-2 font-medium text-gray-500'>All Blogs</h1>
            <BlogTable
                blogs={blogs}
                isLoading={isLoading}
                isError={isError}
                error={error?.message}
            />
            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className='mt-10 flex justify-center items-center gap-2 flex-wrap'>
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
