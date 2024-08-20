import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import SessionProvider, { SessionContext } from "../(main)/SessionProvider";

export default async function Layout({ children }: React.PropsWithChildren) {
    const session = await validateRequest();

    if (session.user) return redirect("/");

    return (
        <SessionProvider value={session as unknown as SessionContext}>
            <Navbar />
            {children}
        </SessionProvider>
    );
}
