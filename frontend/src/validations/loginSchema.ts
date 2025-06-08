import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).trim()
        .nonempty("Email is required")
        .email("Invalid email format"),

    password: z.string({
        required_error: "Password is required"
    }).trim()
        .nonempty("Email is required")
        .min(6, "Password must be at least 6 characters")
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
