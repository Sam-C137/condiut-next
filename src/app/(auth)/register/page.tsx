import Link from "next/link";
import RegisterForm from "@/app/(auth)/register/RegisterForm";

export default function Page() {
    return (
        <div className="mx-auto mt-[5vw] flex h-screen w-full max-w-screen-md flex-col items-center">
            <h3 className="text-4xl">Create an account</h3>
            <Link href="/login" className="mt-4 text-primary hover:underline">
                Already have an account?
            </Link>
            <RegisterForm className="mt-4 w-[20rem] min-w-0 max-w-[90vw]" />
        </div>
    );
}
