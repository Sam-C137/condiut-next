"use client";

import { logout } from "@/app/(auth)/actions";

export function LogoutButton() {
    return (
        <button
            onClick={async () => {
                await logout();
            }}
        >
            {" "}
            Logout
        </button>
    );
}
