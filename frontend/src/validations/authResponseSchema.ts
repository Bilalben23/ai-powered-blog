import { z } from "zod";

export const refreshResponseSchema = z.object({
    user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email()
    }),
    accessToken: z.string()
})


export type RefreshResponse = z.infer<typeof refreshResponseSchema>;
