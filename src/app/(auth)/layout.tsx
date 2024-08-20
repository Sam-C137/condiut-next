import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function Layout({ children }: React.PropsWithChildren) {
    const session = await validateRequest();

    if (session.user) return redirect("/");

    return (
        <div className="min-h-screen">
            <Navbar />
            {children}
        </div>
    );
}
