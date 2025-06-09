import { type FC } from "react";
import { X } from "lucide-react";
import { formatDateReadable } from "@utils/formatDate";
import type { Blog } from "@hooks/useDashboardStats";
import useDeleteBlog from "@hooks/useDeleteBlog";
import toast from "react-hot-toast";


type BlogTableProps = {
    blogs?: Blog[];
    isLoading: boolean;
    isError: boolean;
    error?: string;
    onTogglePublish: (id: string) => void
}


const BlogTable: FC<BlogTableProps> = ({ blogs = [], isLoading, isError, error, onTogglePublish }) => {
    const { mutate: deleteBlog, isPending } = useDeleteBlog();

    const handleDeleteBlogPost = (id: string) => {
        deleteBlog(id, {
            onSuccess: () => {
                toast.success("Blog post deleted successfully.");
            },
            onError: (err) => {
                console.error(err);
                toast.error("Failed to delete blog post. Please try again.");
            }
        })
    }


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
                    {blogs.map((blog, index) => (
                        <tr
                            key={blog._id}
                            className="font-light border-b border-gray-200 last:*:pb-12"
                        >
                            <td className="px-3 py-4 sm:px-6">{index + 1}</td>
                            <td className="px-2 py-4">
                                <p className="max-w-sm md:max-w-md line-clamp-2 md:line-clamp-3">
                                    {blog.title}
                                </p>
                            </td>
                            <td className="px-2 py-4 max-sm:hidden">{formatDateReadable(blog.createdAt)}</td>
                            <td className="px-2 py-4">
                                <p className={blog.isPublished ? "text-green-600" : "text-orange-700"}>
                                    {blog.isPublished ? "Published" : "Unpublished"}
                                </p>
                            </td>
                            <td className="px-2 py-4 text-sm">
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        className="px-3 py-1.5 transition hover:opacity-96 hover:scale-102 text-gray-600 border-2 border-gray-400 rounded cursor-pointer"
                                        onClick={() => onTogglePublish(blog._id)}
                                    >
                                        {!blog.isPublished ? "Publish" : "Unpublish"}
                                    </button>
                                    <button
                                        type="button"
                                        className="p-2 transition border border-red-100 rounded-full shadow-xs cursor-pointer hover:scale-102 hover:opacity-96 bg-red-50 shadow-red-100 disabled:opacity-80"
                                        disabled={isPending}
                                        onClick={() => handleDeleteBlogPost(blog._id)}
                                    >
                                        <X className="text-red-500 size-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogTable;
