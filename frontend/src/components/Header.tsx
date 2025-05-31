import { assets } from '@constants/assets'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className='flex items-center justify-between py-5 mx-6 sm:mx-16 xl:mx-28'>
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
                <button
                    type='button'
                    className='flex items-center gap-2 px-5 sm:px-8 md:px-10 py-2.5 text-sm text-white rounded-full bg-primary transition-opacity hover:opacity-95 shadow-xs hover:shadow-none'
                    onClick={() => navigate("/admin")}
                >
                    Login
                    <img
                        src={assets.arrow}
                        alt='arrow-right'
                        className='w-3'
                    />
                </button>
            </div>
        </header >
    )
}
