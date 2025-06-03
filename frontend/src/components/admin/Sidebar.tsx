import { assets } from '@constants/assets';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className='bg-white sm:border-b-2 sm:border-r-2 border-gray-200 fixed z-5 sm:static w-full sm:w-auto bottom-0 sm:min-h-[calc(100vh-85px)]'>
            <nav>
                <ul className='flex items-center justify-around sm:block'>
                    <li className='flex-1'>
                        <NavLink
                            end
                            to="."
                            className={({ isActive }) => `pl-4 md:pl-6 flex-col sm:flex-row pr-4 md:pr-28 py-2.5 items-center flex gap-x-2 gap-y-1 ${isActive ? "bg-primary/10 border-t-3 md:border-t-0 md:border-r-4 border-primary" : "border-t-3 md:border-t-0 md:border-r-4 border-t-transparent md:border-r-transparent"}`}
                        >
                            <img
                                src={assets.home_icon}
                                alt="Home Icon"
                                className='size-5'
                            />
                            <span className='text-xs sm:text-base'>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className='flex-1'>
                        <NavLink
                            to="blogs/new"
                            className={({ isActive }) => `pl-4 md:pl-6 flex-col sm:flex-row pr-4 md:pr-28 py-2.5 items-center flex gap-x-2 gap-y-1 ${isActive ? "bg-primary/10 border-t-3 md:border-t-0 md:border-r-4 border-primary" : "border-t-3 md:border-t-0 md:border-r-4 border-t-transparent md:border-r-transparent"}`}
                        >
                            <img
                                src={assets.add_icon}
                                alt="New Blog Icon"
                                className='size-5'
                            />
                            <span className='text-xs sm:text-base text-nowrap'>Add Blogs</span>
                        </NavLink>
                    </li>
                    <li className='flex-1'>
                        <NavLink
                            end
                            to="blogs"
                            className={({ isActive }) => `pl-4 md:pl-6 flex-col sm:flex-row pr-4 md:pr-28 py-2.5 items-center flex gap-x-2 gap-y-1 ${isActive ? "bg-primary/10 border-t-3 md:border-t-0 md:border-r-4 border-primary" : "border-t-3 md:border-t-0 md:border-r-4 border-t-transparent md:border-r-transparent"}`}
                        >
                            <img
                                src={assets.list_icon}
                                alt="Blog Icon"
                                className='size-5'
                            />
                            <span className='text-xs sm:text-base text-nowrap'>Blogs list</span>
                        </NavLink>
                    </li>
                    <li className='flex-1'>
                        <NavLink
                            to="comments"
                            className={({ isActive }) => `pl-4 md:pl-6 flex-col sm:flex-row pr-4 md:pr-28 py-2.5 items-center flex gap-x-2 gap-y-1 ${isActive ? "bg-primary/10 border-t-3 md:border-t-0 md:border-r-4 border-primary" : "border-t-3 md:border-t-0 md:border-r-4 border-t-transparent md:border-r-transparent"}`}
                        >
                            <img
                                src={assets.comment_icon}
                                alt="Comment Icon"
                                className='size-5'
                            />
                            <span className='text-xs sm:text-base'>Comments</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}



// pl-4 md:pl-6 pr-4 md:pr-28 py-2.5 items-center flex gap-x-2 border-b-3 md:border-r-4 border-b-transparent border-r-transparent
// pl-4 md:pl-6 pr-4 md:pr-28 py-2.5 items-center flex gap-x-2 bg-primary/10 border-b-3 md:border-b-0 md:border-r-4 border-primary