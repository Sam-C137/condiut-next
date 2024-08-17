import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "@/app/(main)/SessionProvider";

export default async function Layout({ children }: React.PropsWithChildren) {
    const session = await validateRequest();

    if (!session.user) return redirect("/login");

    return (
        <SessionProvider value={session}>
            <div className="flex min-h-screen flex-col">{children}</div>
        </SessionProvider>
    );
}
