import { assets } from '@constants/assets'
import { useNavigate } from 'react-router-dom'
import { LogOut } from "lucide-react";
import { useState } from 'react';

export default function Header({ classes = "" }: { classes?: string }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogout = () => {
        const confirmLogout = confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            setIsAuthenticated(false);
            navigate("/")
        }
    }

    return (
        <header className={`flex items-center justify-between py-3 md:py-5 px-4 sm:px-16 xl:px-28 ${classes}`}>
            <button
                type='button'
                className='transition-opacity cursor-pointer hover:opacity-95'
                onClick={() => navigate("/")}
            >
                <img
                    src={assets.logo}
                    alt="logo"
                    className='w-28 sm:w-36 md:w-40'
                />
            </button>

            <div>
                {
                    isAuthenticated
                        ? <button
                            type='button'
                            className='flex items-center gap-2 px-5 sm:px-8 md:px-10 text-sm md:text-base py-2.5 cursor-pointer text-white rounded-full bg-primary transition-opacity hover:opacity-95 shadow-xs hover:shadow-none'
                            onClick={handleLogout}
                        >
                            Logout <LogOut size={18} />
                        </button>
                        : <button
                            type='button'
                            className='flex items-center gap-2 px-5 sm:px-8 md:px-10 text-sm md:text-base py-2.5 text-white rounded-full bg-primary transition-opacity hover:opacity-95 shadow-xs hover:shadow-none cursor-pointer'
                            onClick={() => navigate("/admin")}
                        >
                            Login
                            <img
                                src={assets.arrow}
                                alt='arrow-right'
                                className='w-3'
                            />
                        </button>
                }
            </div>
        </header >
    )
}
