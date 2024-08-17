import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, - and _ allowed"),
});

export type RegisterUserDetails = z.infer<typeof registerSchema>;

export const loginSchema = registerSchema.omit({ username: true });

export type LoginUserDetails = z.infer<typeof loginSchema>;
