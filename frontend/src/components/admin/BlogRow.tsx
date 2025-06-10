import useDeleteBlog from '@hooks/useDeleteBlog';
import useTogglePublish from '@hooks/useTogglePublish';
import { formatDateReadable } from '@utils/formatDate';
import { X } from 'lucide-react';
import type { FC } from 'react';
import toast from 'react-hot-toast';


interface BlogRowProps {
    index: number;
    blogId: string;
    title: string;
    createdAt: string;
    isPublished: boolean
}

const BlogRow: FC<BlogRowProps> = ({ index, blogId, title, createdAt, isPublished }) => {
    const { mutate: deleteBlog, isPending: isDeletePending } = useDeleteBlog();
    const { mutate: toggleBlog, isPending: isTogglePending } = useTogglePublish();

    const handleDelete = (id: string) => {
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

    const handleToggle = (id: string) => {
        toggleBlog(id, {
            onError: (error) => {
                toast.error("Failed to toggle publish status");
                console.error("Failed to toggle publish status:", error);
            }
        })
    }

    return <tr className="font-light border-b border-gray-200 last:*:pb-12">
        <td className="px-3 py-4 sm:px-6">{index}</td>
        <td className="px-2 py-4">
            <p className="max-w-sm md:max-w-md line-clamp-2 md:line-clamp-3">
                {title}
            </p>
        </td>
        <td className="px-2 py-4 max-sm:hidden">{formatDateReadable(createdAt)}</td>
        <td className="px-2 py-4">
            <p className={isPublished ? "text-green-600" : "text-orange-700"}>
                {isPublished ? "Published" : "Unpublished"}
            </p>
        </td>
        <td className="px-2 py-4 text-sm">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    disabled={isTogglePending}
                    className="px-3 py-1.5 transition disabled:opacity-90 hover:opacity-96 hover:scale-102 text-gray-600 border-2 border-gray-400 rounded cursor-pointer"
                    onClick={() => handleToggle(blogId)}
                >
                    {!isPublished ? "Publish" : "Unpublish"}
                </button>
                <button
                    type="button"
                    className="p-2 transition border border-red-100 rounded-full shadow-xs cursor-pointer hover:scale-102 hover:opacity-96 bg-red-50 shadow-red-100 disabled:opacity-80"
                    disabled={isDeletePending}
                    onClick={() => handleDelete(blogId)}
                >
                    <X className="text-red-500 size-4" />
                </button>
            </div>
        </td>
    </tr>
}

export default BlogRow;