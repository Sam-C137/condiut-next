import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function Layout({ children }: React.PropsWithChildren) {
    const { user } = await validateRequest();

    if (user) return redirect("/");

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
