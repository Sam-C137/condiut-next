"use server";

import { registerSchema, RegisterUserDetails } from "@/lib/validators";
import { isRedirectError } from "next/dist/client/components/redirect";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import prisma from "@/lib/prisma";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(
    credentials: RegisterUserDetails,
): Promise<Record<"error", string>> {
    try {
        const { username, password, email } = registerSchema.parse(credentials);

        const passwordHash = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        });

        const userId = generateIdFromEntropySize(10);

        const existingUserName = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username,
                },
            },
        });

        if (existingUserName) {
            return {
                error: "Username already taken",
            };
        }

        const existingEmail = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                },
            },
        });

        if (existingEmail) {
            return {
                error: "Email already taken",
            };
        }

        await prisma.user.create({
            data: {
                id: userId,
                username,
                email,
                passwordHash,
            },
        });

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return redirect("/");
    } catch (e) {
        if (isRedirectError(e)) throw e;
        console.error(e);
        return {
            error: "Something went wrong. Please try again",
        };
    }
}
