import { useMutation } from '@tanstack/react-query';
import useAxios from './useAxios';
import { z } from 'zod';

const generateDescriptionResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        description: z.string()
    })
})


export default function useGenerateDescription() {
    const axios = useAxios();

    return useMutation({
        mutationKey: ["generateDescription"],
        mutationFn: async (prompt: string) => {
            const { data } = await axios.post("/v1/blogs/generate-description", { prompt });

            const parsed = generateDescriptionResponseSchema.safeParse(data);
            if (!parsed.success) {
                console.error('Response validation failed:', parsed.error.flatten());
                throw new Error('Invalid response format');
            }

            return parsed.data.data;
        }
    })
}
