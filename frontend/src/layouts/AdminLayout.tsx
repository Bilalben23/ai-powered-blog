import Sidebar from '@components/admin/Sidebar'
import Footer from '@components/Footer'
import Header from '@components/Header'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <>
            <Header classes='border-b-2 border-gray-200' />
            <main className='bg-[#F6FAFE] h-[800px] flex gap-x-5'>
                <Sidebar />
                <Outlet />
            </main>
            <Footer classes='bg-primary/3' />
        </>
    )
}
