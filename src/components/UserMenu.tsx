"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import Link from "next/link";
import Avatar from "./ui/avatar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function UserMenu() {
    const { user } = useSession();
    const pathname = usePathname();

    return (
        <div className="flex gap-4">
            {user ? (
                <>
                    <Link
                        href="/editor"
                        className={cn(
                            "font-source-sans text-muted-foreground transition-colors hover:text-card-foreground",
                            {
                                "text-card-foreground": pathname === "/editor",
                            },
                        )}
                    >
                        New Article
                    </Link>
                    <Link
                        href="/settings"
                        className={cn(
                            "font-source-sans text-muted-foreground transition-colors hover:text-card-foreground",
                            {
                                "text-card-foreground":
                                    pathname === "/settings",
                            },
                        )}
                    >
                        Settings
                    </Link>
                    <Link
                        href={`/profile/${user.username}`}
                        className={cn(
                            "font-source-sans text-muted-foreground transition-colors hover:text-card-foreground",
                            {
                                "text-card-foreground":
                                    pathname === `/profile/${user.username}`,
                            },
                        )}
                    >
                        <Avatar src={user.image} alt={user.username} />
                        {user.username}
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        href="/"
                        className={cn(
                            "font-source-sans text-muted-foreground transition-colors hover:text-card-foreground",
                            {
                                "text-card-foreground": pathname === "/",
                            },
                        )}
                    >
                        Home
                    </Link>
                    <Link
                        href="/login"
                        className={cn(
                            "font-source-sans text-muted-foreground transition-colors hover:text-card-foreground",
                            {
                                "text-card-foreground": pathname === "/login",
                            },
                        )}
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/register"
                        className={cn(
                            "font-source-sans text-muted-foreground transition-colors hover:text-card-foreground",
                            {
                                "text-card-foreground":
                                    pathname === "/register",
                            },
                        )}
                    >
                        Sign Up
                    </Link>
                </>
            )}
        </div>
    );
}
