import type { Metadata } from "next";
import { Source_Sans_3, Titillium_Web } from "next/font/google";
import "./globals.css";
import { validateRequest } from "@/auth";
import SessionProvider from "@/app/SessionProvider";

const titilliumWeb = Titillium_Web({
    weight: ["200", "300", "400", "600", "900"],
    subsets: ["latin"],
    variable: "--font-titillium-web",
});

const sourceSans = Source_Sans_3({
    weight: ["400", "600"],
    subsets: ["latin"],
    variable: "--font-source-sans",
});

export const metadata: Metadata = {
    title: {
        template: "%s | condiut",
        default: "condiut",
    },
    description: "The real world app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await validateRequest();

    return (
        <html lang="en">
            <body className={`${titilliumWeb.variable} ${sourceSans.variable}`}>
                <SessionProvider value={session}>{children}</SessionProvider>
            </body>
        </html>
    );
}
