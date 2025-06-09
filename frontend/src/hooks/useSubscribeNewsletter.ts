import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@utils/axiosInstance';
import { z } from 'zod';

interface SubscribeInput {
    email: string;
}

const subscribeResponseSchema = z.object({
    success: z.boolean(),
    message: z.string()
});


export default function useSubscribeNewsletter() {
    return useMutation({
        mutationKey: ["subscribeToNewsletter"],
        mutationFn: async (input: SubscribeInput) => {
            const { data } = await axiosInstance.post("/v1/newsletter/subscribe", input);

            // Validate response using zod
            const parsed = subscribeResponseSchema.safeParse(data);
            if (!parsed.success) {
                console.error("Response validation failed:", parsed.error.flatten());
                throw new Error("Invalid response data");
            }

            return parsed.data; 3
        }
    })
}
