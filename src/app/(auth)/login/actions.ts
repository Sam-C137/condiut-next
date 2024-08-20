"use server";

import { loginSchema, LoginUserDetails } from "@/lib/validators";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { lucia } from "@/auth";
import { cookies } from "next/headers";

export async function login(
    credentials: LoginUserDetails,
): Promise<Record<"error", string>> {
    try {
        const { email, password } = loginSchema.parse(credentials);

        const existingUser = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (!existingUser) {
            return {
                error: "Incorrect username or password",
            };
        }

        const validPassword = await compare(
            password,
            existingUser.passwordHash,
        );

        if (!validPassword) {
            return {
                error: "Incorrect username or password",
            };
        }

        const session = await lucia.createSession(existingUser.id, {});
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
