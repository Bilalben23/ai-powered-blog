import { type FC } from "react";
import { X } from "lucide-react";
import { formatDateReadable } from "@utils/formatDate";
import type { Blog } from "@hooks/useDashboardStats";
import useDeleteBlog from "@hooks/useDeleteBlog";
import toast from "react-hot-toast";
import useTogglePublish from "@hooks/useTogglePublish";
import BlogRow from "./BlogRow";


type BlogTableProps = {
    blogs?: Blog[];
    isLoading: boolean;
    isError: boolean;
    error?: string
}


const BlogTable: FC<BlogTableProps> = ({ blogs = [], isLoading, isError, error }) => {
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
                    {blogs.map((blog, index) => <BlogRow
                        key={blog._id}
                        index={index + 1}
                        blogId={blog._id}
                        title={blog.title}
                        isPublished={blog.isPublished}
                        createdAt={blog.createdAt}
                    />
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BlogTable;
