import { assets } from '@constants/assets';
import { blogData } from '@constants/blogData';
import { useState } from 'react';
import BlogTable from '@components/admin/BlogTable';


export default function AdminDashboard() {

    const [dashboardData, setDashboardData] = useState({
        "blogs": 10,
        "comments": 5,
        "drafts": 0,
        "recentBlogs": blogData.slice(0, 5)
    })

    const handleToggleBlogPublish = (id: string) => {
        // TODO: Implement a PATCH request to the backend to toggle publish status
        console.log(`🔄 Toggling publish status for blog with ID: ${id}`);
    }

    const handleDeleteBlogPost = (id: string) => {
        // TODO: Implement a DELETE request to the backend to delete the blog post
        console.log(`🗑️ Sending delete request for blog with ID: ${id}`);
    }

    const recentBlogs = blogData.slice(1, 7);



    return (
        <section className='flex-1 w-full p-3 sm:p-6 md:p-10'>
            <div className='flex flex-wrap gap-4'>
                <div className='flex items-center w-full p-4 transition-all bg-white rounded shadow cursor-pointer gap-x-4 sm:w-auto min-w-56 hover:scale-102'>
                    <img
                        src={assets.dashboard_icon_1}
                        alt="Dashboard Icon"
                        className='size-12 md:size-16'
                    />
                    <div>
                        <p className='text-lg font-semibold md:text-xl'>{dashboardData.blogs}</p>
                        <p className='font-light text-gray-500'>Blogs</p>
                    </div>
                </div>
                <div className='flex items-center w-full p-4 transition-all bg-white rounded shadow cursor-pointer gap-x-4 sm:w-auto min-w-56 hover:scale-102'>
                    <img
                        src={assets.dashboard_icon_2}
                        alt="Dashboard Icon"
                        className='size-12 md:size-16'
                    />
                    <div>
                        <p className='text-lg font-semibold md:text-xl'>{dashboardData.comments}</p>
                        <p className='font-light text-gray-500'>Comments</p>
                    </div>
                </div>
                <div className='flex items-center w-full p-4 transition-all bg-white rounded shadow cursor-pointer gap-x-4 sm:w-auto min-w-56 hover:scale-102'>
                    <img
                        src={assets.dashboard_icon_3}
                        alt="Dashboard Icon"
                        className='size-12 md:size-16'
                    />
                    <div>
                        <p className='text-lg font-semibold md:text-xl'>{dashboardData.drafts}</p>
                        <p className='font-light text-gray-500'>Drafts</p>
                    </div>
                </div>
            </div>

            <div className='mt-10'>
                <h2 className='flex items-center font-medium gap-x-3'>
                    <img
                        src={assets.dashboard_icon_4}
                        alt=""
                        className='size-6' />
                    Latest Blogs
                </h2>

                <BlogTable
                    blogs={recentBlogs}
                    onTogglePublish={handleToggleBlogPublish}
                    onDelete={handleDeleteBlogPost}
                />
            </div>
        </section>
    )
}
