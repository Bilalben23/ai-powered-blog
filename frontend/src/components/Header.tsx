import { assets } from '@constants/assets'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className='flex items-center justify-between py-5 mx-8 sm:mx-20 xl:mx-32'>
            <Link to="/" className='transition-opacity hover:opacity-95'>
                <img
                    src={assets.logo}
                    alt="logo"
                    className='w-32 sm:44'
                />
            </Link>

            <div>
                <Link to="/admin" className='flex items-center gap-2 px-10 py-2.5 text-sm text-white rounded-full bg-primary transition-opacity hover:opacity-95 shadow-xs hover:shadow-none' >
                    Login
                    <img
                        src={assets.arrow}
                        alt='arrow-right'
                        className='w-3'
                    />
                </Link>
            </div>
        </header >
    )
}
