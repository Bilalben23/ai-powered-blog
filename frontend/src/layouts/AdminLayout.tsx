import Sidebar from '@components/admin/Sidebar'
import Footer from '@components/Footer'
import Header from '@components/Header'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <>
            <Header classes='border-b-2 border-gray-200 md:!px-6' />
            <main className='bg-[#F6FAFE] flex'>
                <Sidebar />
                <Outlet />
            </main>
            <Footer classes='bg-primary/3' />
        </>
    )
}
