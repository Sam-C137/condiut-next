"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterUserDetails } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/app/(auth)/register/actions";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PasswordInput } from "@/components/ui/password-input";
import { LoadingButton } from "@/components/ui/loading-button";

interface RegisterFormProps {
    className?: string;
}

export default function RegisterForm({ className }: RegisterFormProps) {
    const [error, setError] = useState<string>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<RegisterUserDetails>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
    });

    async function onSubmit(details: RegisterUserDetails) {
        setError(undefined);
        startTransition(async () => {
            const { error } = await register(details);
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
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Username"
                                    className="px-6 py-4 text-base"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name="username"
                />
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
                                    placeholder="Password"
                                    className="px-6 py-4 text-base"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name="password"
                />
                <LoadingButton
                    loading={isPending}
                    type="submit"
                    className="mt-4 w-full"
                >
                    Submit
                </LoadingButton>
            </form>
        </Form>
    );
}
