import { assets } from '@constants/assets';
import BlogTable from '@components/admin/BlogTable';
import useDashboardStats from '@hooks/useDashboardStats';

export default function AdminDashboard() {
    const { data, isLoading, isError, error } = useDashboardStats();
    const recentBlogs = data?.latestBlogs;
    const totalBlogs = data?.totalBlogs;
    const totalComments = data?.totalComments;
    const totalDrafts = data?.totalDrafts;

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
                        {
                            isLoading
                                ? <p className='w-8 h-5 bg-gray-300 rounded-lg animate-pulse'></p>
                                : <p className='text-lg font-semibold md:text-xl'>{totalBlogs}</p>
                        }
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
                        {
                            isLoading
                                ? <p className='w-8 h-5 bg-gray-300 rounded-lg animate-pulse'></p>
                                : <p className='text-lg font-semibold md:text-xl'>{totalComments}</p>
                        }
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
                        {
                            isLoading
                                ? <p className='w-8 h-5 bg-gray-300 rounded-lg animate-pulse'></p>
                                : <p className='text-lg font-semibold md:text-xl'>{totalDrafts}</p>
                        }
                        <p className='font-light text-gray-500'>Drafts</p>
                    </div>
                </div>
            </div>

            <div className='mt-10'>
                <h2 className='flex items-center font-medium gap-x-3'>
                    <img
                        src={assets.dashboard_icon_4}
                        alt=""
                        className='size-5' />
                    Latest Blogs
                </h2>

                <BlogTable
                    blogs={recentBlogs}
                    isLoading={isLoading}
                    isError={isError}
                    error={error?.message}
                />
            </div>
        </section>
    )
}
