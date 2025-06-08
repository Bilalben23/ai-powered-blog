import axiosInstance from "@utils/axiosInstance";
import { useAuth } from "./useAuth";
import { refreshResponseSchema } from "@validations/authResponseSchema";


export default function useRefresh() {
    const { login } = useAuth();

    const refresh = async (): Promise<string | null> => {
        try {
            const { data } = await axiosInstance.post("/v1/auth/refresh-token");

            const result = refreshResponseSchema.safeParse(data);
            if (!result.success) {
                console.error("Validation failed: ", result.error.format());
                return null;
            }

            const validationData = result.data;
            login({
                user: validationData.user,
                accessToken: validationData.accessToken
            });
            return validationData.accessToken;

        } catch (err) {
            console.error("Request failed:", err);
            return null;
        }
    }

    return refresh;
}