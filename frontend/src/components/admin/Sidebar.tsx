import { assets } from '@constants/assets';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className='bg-white border-b-2 border-r-2 border-gray-200 min-h-[calc(100vh-85px)]'>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            end
                            to="."
                            className={({ isActive }) => `pl-4 md:pl-6 pr-4 md:pr-28 py-2.5 items-center flex gap-x-2 ${isActive ? "bg-primary/10 border-b-3 md:border-b-0 md:border-r-4 border-primary" : "border-b-3 md:border-b-0 md:border-r-4 border-b-transparent md:border-r-transparent"}`}
                        >
                            <img
                                src={assets.home_icon}
                                alt="Home Icon"
                                className='size-5'
                            />
                            <span className='hidden md:inline'>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="blogs/new"
                            className={({ isActive }) => `pl-4 md:pl-6 pr-4 md:pr-28 py-2.5 items-center flex gap-x-2 ${isActive ? "bg-primary/10 border-b-3 md:border-b-0 md:border-r-4 border-primary" : "border-b-3 md:border-b-0 md:border-r-4 border-b-transparent md:border-r-transparent"}`}
                        >
                            <img
                                src={assets.add_icon}
                                alt="Home Icon"
                                className='size-5'
                            />
                            <span className='hidden md:inline'>Add Blogs</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            end
                            to="blogs"
                            className={({ isActive }) => `pl-4 md:pl-6 pr-4 md:pr-28 py-2.5 items-center flex gap-x-2 ${isActive ? "bg-primary/10 border-b-3 md:border-b-0 md:border-r-4 border-primary" : "border-b-3 md:border-b-0 md:border-r-4 border-b-transparent md:border-r-transparent"}`}
                        >
                            <img
                                src={assets.list_icon}
                                alt="Home Icon"
                                className='size-5'
                            />
                            <span className='hidden md:inline'>Blogs list</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="comments"
                            className={({ isActive }) => `pl-4 md:pl-6 pr-4 md:pr-28 py-2.5 items-center flex gap-x-2 ${isActive ? "bg-primary/10 border-b-3 md:border-b-0 md:border-r-4 border-primary" : "border-b-3 md:border-b-0 md:border-r-4 border-b-transparent md:border-r-transparent"}`}
                        >
                            <img
                                src={assets.comment_icon}
                                alt="Home Icon"
                                className='size-5'
                            />
                            <span className='hidden md:inline'>Comments</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}



// pl-4 md:pl-6 pr-4 md:pr-28 py-2.5 items-center flex gap-x-2 border-b-3 md:border-r-4 border-b-transparent border-r-transparent
// pl-4 md:pl-6 pr-4 md:pr-28 py-2.5 items-center flex gap-x-2 bg-primary/10 border-b-3 md:border-b-0 md:border-r-4 border-primary