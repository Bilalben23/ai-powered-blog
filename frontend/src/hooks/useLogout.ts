import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios';
import toast from 'react-hot-toast';
import { useAuth } from './useAuth';

export default function useLogout() {
    const axios = useAxios();
    const queryClient = useQueryClient();
    const { logout } = useAuth();

    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            const { data } = await axios.post("/v1/auth/logout");
            return data;
        },
        onSuccess: () => {
            queryClient.clear();
            logout();
            toast.success("You have been logged out successfully.");

        },
        onError: () => {
            toast.error("Failed to logout. Please try again.");
        }
    })
}
