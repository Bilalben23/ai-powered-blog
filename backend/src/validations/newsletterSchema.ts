import { z } from "zod";

export const subscribeSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email("Invalid email format")
})


export type SubscribeInput = z.infer<typeof subscribeSchema>; 