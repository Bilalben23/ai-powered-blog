import { type FC } from "react";
import type { Blog } from "@hooks/useDashboardStats";
import BlogRow from "./BlogRow";
import BlogTableSkeleton from "@components/skeletons/BlogTableSkeleton";
import ErrorMessage from "@components/ErrorMessage";
import { tr } from "zod/v4/locales";
import { Link } from "react-router-dom";


type BlogTableProps = {
    blogs?: Blog[];
    isLoading: boolean;
    isError: boolean;
    error?: string;
    skeletonRowsNumber?: number
}


const BlogTable: FC<BlogTableProps> = ({ blogs = [], isLoading, isError, error, skeletonRowsNumber = 6 }) => {
    return (
        <div className="relative max-w-full mt-5 overflow-x-auto bg-white rounded-lg shadow md:max-w-5xl">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th scope="col" className="px-2 py-4 font-medium xl:px-6">
                            #
                        </th>
                        <th scope="col" className="px-2 py-4 font-medium">
                            BLOG TITLE
                        </th>
                        <th scope="col" className="px-2 py-4 font-medium max-sm:hidden">
                            DATE
                        </th>
                        <th scope="col" className="px-2 py-4 font-medium max-w-sm:hidden">
                            STATUS
                        </th>
                        <th scope="col" className="px-2 py-4 font-medium">
                            ACTIONS
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !isError ?
                            isLoading
                                ? <BlogTableSkeleton rowsNumber={skeletonRowsNumber} />
                                : blogs.length !== 0 ?
                                    blogs.map((blog, index) => <BlogRow
                                        key={blog._id}
                                        index={index + 1}
                                        blogId={blog._id}
                                        title={blog.title}
                                        isPublished={blog.isPublished}
                                        createdAt={blog.createdAt}
                                    />)
                                    : <tr>
                                        <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                            No blogs found.{' '}
                                            <Link
                                                to="/admin/blogs/new"
                                                className="text-blue-600 hover:underline font-medium"
                                            >
                                                Create your first blog post
                                            </Link>
                                            .
                                        </td>
                                    </tr>

                            : <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-red-600">
                                    <ErrorMessage
                                        title="Failed to load blog data"
                                        message={error}
                                    />
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default BlogTable;
