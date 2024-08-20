import UserMenu from "./UserMenu";

export default function Navbar() {
    return (
        <header className="sticky top-0 w-full bg-card shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:w-[80%]">
                <div className="font-titillium text-2xl font-semibold text-primary">
                    conduit
                </div>
                <UserMenu />
            </div>
        </header>
    );
}
