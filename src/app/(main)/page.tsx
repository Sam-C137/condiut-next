import { LogoutButton } from "@/app/(main)/LogoutButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlobalFeed } from "@/app/(main)/GlobalFeed";
import { PersonalFeed } from "@/app/(main)/PersonalFeed";

export default function Home() {
    return (
        <main>
            <Banner />
            <Tabs defaultValue="global">
                <TabsList>
                    <TabsTrigger value="global">Global Feed</TabsTrigger>
                    <TabsTrigger value="personal">Personal Feed</TabsTrigger>
                </TabsList>
                <TabsContent value="global">
                    <GlobalFeed />
                </TabsContent>
                <TabsContent value="personal">
                    <PersonalFeed />
                </TabsContent>
            </Tabs>
            <LogoutButton />
        </main>
    );
}

function Banner() {
    return (
        <div className="mb-[40px] flex w-full flex-col items-center bg-primary py-[32px] text-muted">
            <h2 className="font-titillium text-[3.5rem] font-semibold shadow-sm">
                Conduit
            </h2>
            <p className="text-2xl font-light">
                A place to share your knowledge
            </p>
        </div>
    );
}
