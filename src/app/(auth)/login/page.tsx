import Link from "next/link";
import LoginForm from "@/app/(auth)/login/LoginForm";

export default async function Page() {
    return (
        <main className="mx-auto mt-[5vw] flex w-full max-w-screen-md flex-col items-center">
            <h3 className="text-4xl">Login to your account</h3>
            <Link
                href="/register"
                className="mt-4 text-primary hover:underline"
            >
                Need an account?
            </Link>
            <LoginForm className="mt-4 w-[20rem] min-w-0 max-w-[90vw]" />
        </main>
    );
}
