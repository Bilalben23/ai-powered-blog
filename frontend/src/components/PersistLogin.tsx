import { useAuth } from '@hooks/useAuth';
import useRefresh from '@hooks/useRefresh';
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

export default function PersistLogin() {
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();
    const refresh = useRefresh();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        !isAuthenticated ? verifyRefreshToken() : setLoading(false);
    }, [isAuthenticated, refresh])

    return !loading
        ? <div className="flex items-center justify-center h-screen">
            <HashLoader />
        </div>
        : <Outlet />

}
