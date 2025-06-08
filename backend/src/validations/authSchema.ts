import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }).min(3, "name must be at least 3 characters"),

    email: z.string({
        required_error: "Email is required"
    }).email("Invalid email format"),

    password: z.string({
        required_error: "Password is required"
    }).min(6, "Password must be at least 6 characters")
})


export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email("Invalid email format"),

    password: z.string({
        required_error: "Password is required"
    }).min(6, "Password must be at least 6 characters")
})


export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
