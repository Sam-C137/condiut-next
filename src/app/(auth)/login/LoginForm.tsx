"use client";

import { useState, useTransition } from "react";
import { loginSchema, LoginUserDetails } from "@/lib/validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/app/(auth)/login/actions";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { LoadingButton } from "@/components/ui/loading-button";

interface LoginFormProps {
    className?: string;
}

export default function LoginForm({ className }: LoginFormProps) {
    const [error, setError] = useState<string>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<LoginUserDetails>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(credentials: LoginUserDetails) {
        setError(undefined);
        startTransition(async () => {
            const { error } = await login(credentials);
            if (error) setError(error);
        });
    }

    return (
        <Form {...form}>
            <form
                className={cn(className, "flex flex-col gap-2")}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {error && (
                    <p className="text-center text-destructive">{error}</p>
                )}
                <FormField
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-normal text-muted-foreground">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    className="px-6 py-4 text-base"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name="email"
                />
                <FormField
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-normal text-muted-foreground">
                                Password
                            </FormLabel>
                            <FormControl>
                                <PasswordInput
                                    className="px-6 py-4 text-base"
                                    placeholder="Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name="password"
                />
                <LoadingButton
                    type="submit"
                    loading={isPending}
                    className="mt-4 w-full"
                >
                    Login
                </LoadingButton>
            </form>
        </Form>
    );
}
