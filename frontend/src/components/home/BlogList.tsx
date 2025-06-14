import { blogCategories } from '@constants/categories';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from './BlogCard';
import useBlogsByCategory, { type BlogCategoryFilter, fetchBlogsByCategory } from '@hooks/useBlogsByCategory';
import { useQueryClient } from '@tanstack/react-query';
import { Ban } from 'lucide-react';
import BlogCardSkeleton from '@components/skeletons/BlogCardSkeleton';
import { useSearchContext } from '@hooks/useSearchContext';


export default function BlogList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const { searchText } = useSearchContext();

    const initialCategory = (searchParams.get("category") as BlogCategoryFilter) || "all";
    const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

    const [category, setCategory] = useState<BlogCategoryFilter>(initialCategory);
    const [page, setPage] = useState<number>(initialPage);

    const { data, isLoading, isError, error, isPlaceholderData, } = useBlogsByCategory({ category, page, q: searchText });
    const blogs = data?.blogs;
    const pagination = data?.pagination;


    useEffect(() => {
        const currentParams = Object.fromEntries(searchParams.entries());
        const newParams = {
            ...currentParams,
            category,
            page: String(page)
        };
        setSearchParams(newParams);
    }, [category, page]);


    useEffect(() => {
        if (!isPlaceholderData && pagination && pagination.hasNextPage) {
            queryClient.prefetchQuery({
                queryKey: ["blogs", category, page + 1, searchText],
                queryFn: () => fetchBlogsByCategory(category, page + 1, searchText)
            })
        }
    }, [queryClient, pagination?.hasNextPage, isPlaceholderData, category, page, searchText])

    useEffect(() => {
        window.scrollTo({ top: 580, behavior: 'smooth' });
    }, [page]);


    return (
        <section className='p-2 mb-24'>
            {/* categories */}
            <div className='relative flex flex-wrap justify-center gap-2 my-10 sm:gap-4' >
                {
                    (["all", ...blogCategories] as BlogCategoryFilter[]).map((cat, index) => (
                        <button
                            key={index}
                            type='button'
                            className={`relative px-5 py-1.5 text-gray-500 capitalize rounded-full cursor-pointer ${cat === category && "text-white"}`}
                            onClick={() => {
                                setCategory(cat);
                                setPage(1); // Reset category when category changes
                            }}

                        >
                            {cat}
                            {
                                cat === category && <motion.span
                                    layoutId='underline'
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}

                                    className='absolute inset-0 rounded-full bg-primary -z-1'></motion.span>
                            }
                        </button>
                    ))
                }
            </div>

            {/* Blog Cards */}
            <div className='container mx-auto grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {isError ? (
                    <div className='col-span-full text-center text-red-600'>
                        <p>{error.message}</p>
                    </div>
                ) : isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => <BlogCardSkeleton
                        key={i}
                    />)
                ) : (
                    blogs?.length === 0
                        ? <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
                            <Ban className="w-14 h-14 mb-4 text-gray-400" />
                            <p className="text-lg font-medium text-center">
                                No blogs found in <span className="capitalize text-primary">{category}</span> category.
                            </p>
                        </div>
                        : blogs?.map(blog => (
                            <BlogCard
                                key={blog._id}
                                id={blog._id}
                                image={blog.image}
                                category={blog.category}
                                title={blog.title}
                                description={blog.description}
                            />
                        ))
                )}
            </div>

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
