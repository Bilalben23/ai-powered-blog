import BlogTable from '@components/admin/BlogTable'
import { blogData } from '@constants/blogData'

export default function AdminBlogList() {

    const handleToggleBlogPublish = (id: string) => {
        // TODO: Implement a PATCH request to the backend to toggle publish status
        console.log(`🔄 Toggling publish status for blog with ID: ${id}`);
    }

    const handleDeleteBlogPost = (id: string) => {
        // TODO: Implement a DELETE request to the backend to delete the blog post
        console.log(`🗑️ Sending delete request for blog with ID: ${id}`);
    }

    return (
        <section className='flex-1 w-full p-3 sm:p-6 md:p-10'>
            <h1 className='mb-2 font-medium text-gray-500'>All Blogs</h1>
            <BlogTable
                blogs={blogData}
                onDelete={handleDeleteBlogPost}
                onTogglePublish={handleToggleBlogPublish}
            />
        </section>
    )
}
