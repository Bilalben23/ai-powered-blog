import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import useRefresh from './useRefresh';
import { useEffect } from 'react';
import axiosInstance from '@utils/axiosInstance';

export default function useAxios() {
    const refresh = useRefresh();
    const { accessToken, logout } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        // request interceptor (attach access token to the request)
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    config.headers.set("Authorization", `Bearer ${accessToken}`);
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        )

        // response interceptor (handle access token expiration)
        const responseInterceptor = axiosInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response?.status === 401) {
                    try {
                        // Attempt refresh new access token
                        const newAccessToken = await refresh();
                        if (!newAccessToken) {
                            logout();
                            navigate("/login");
                            return Promise.reject(error);
                        }

                        // retry the original request with new access
                        originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);
                        return axiosInstance(originalRequest);
                    } catch (refreshError) {
                        console.error("Token refresh failed", (refreshError as Error).message);
                        logout();
                        navigate("/login");
                    }
                }

                // if not a 401 authorization error, reject promise as usual
                return Promise.reject(error);
            }
        )

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        }

    }, [refresh, navigate])

    return axiosInstance;
}
