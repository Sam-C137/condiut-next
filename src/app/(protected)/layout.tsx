import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: React.PropsWithChildren) {
    const session = await validateRequest();

    if (!session.user) return redirect("/login");

    return <div className="flex min-h-screen flex-col">{children}</div>;
}
