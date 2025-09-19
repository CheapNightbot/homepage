import LoadingScreen from "@/components/loading-screen";
import Shelf from "@/components/shelf";
import { ThemeProvider } from "@/components/theme-provider";
import TopBar from "@/components/top-bar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import Window from "@/components/window";
import { useEffect, useState } from "react";
import { Bluesky, Discord, Github, Mastodon, TwitterX } from "./components/icons";
import ProfileAvatar from "./components/profile-avatar";
import { cn, copyToClipboard } from "./lib/utils";

function App() {
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            if (window.sessionStorage.getItem("hasShownLoading")) {
                setLoading(false);
                setShowContent(true);
                return;
            }

            setTimeout(() => {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                    window.sessionStorage.setItem("hasShownLoading", "true");
                });
            }, 2000);
        };

        window.addEventListener("load", handleLoad);
        return () => { window.removeEventListener("load", handleLoad) };
    }, []);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="potato-ui-theme">
            {loading && <LoadingScreen />}
            {
                showContent &&
                <>
                    <div className={cn("wallpaper", !loading && "!transition-none")}></div>
                    <TopBar />
                    <Toaster position="top-center" />
                    <main id="main" className="w-screen h-[calc(100dvh-140px)]">
                        <Window title={"About"} contentClassName="flex flex-col items-center gap-4 p-12">
                            <section className="flex flex-col items-center gap-6">
                                <ProfileAvatar />
                                <div className="flex-1 flex flex-col items-center">
                                    <p>yoho, me a boiled potato ~</p>
                                    <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-400  dark:from-[#92a4ff] dark:to-[#ffa9d3]">Cheap Nightbot</h2>
                                    <div>
                                        <Button onClick={() => window.open("https://bsky.app/profile/cheapnightbot.me", "_blank")} variant="ghost" size="icon" className="active:scale-95 bg-transparent">
                                            <Bluesky />
                                            <small className="sr-only">Bluesky</small>
                                        </Button>
                                        <Button onClick={async () => await copyToClipboard("cheapnightbot", "Discord username copied to the clipboard!")} variant="ghost" size="icon" className="active:scale-95 bg-transparent">
                                            <Discord />
                                            <small className="sr-only">Discord</small>
                                        </Button>
                                        <Button onClick={() => window.open("https://github.com/CheapNightbot", "_blank")} variant="ghost" size="icon" className="active:scale-95 bg-transparent">
                                            <Github />
                                            <small className="sr-only">GitHub</small>
                                        </Button>
                                        <Button onClick={() => window.open("https://mastodon.social/@CheapNightbot", "_blank")} variant="ghost" size="icon" className="active:scale-95 bg-transparent">
                                            <Mastodon />
                                            <small className="sr-only">Mastodon</small>
                                        </Button>
                                        <Button onClick={() => window.open("https://x.com/CheapNightbot", "_blank")} variant="ghost" size="icon" className="active:scale-95 bg-transparent">
                                            <TwitterX />
                                            <small className="sr-only">X (Formerly Twitter)</small>
                                        </Button>
                                    </div>
                                </div>
                            </section>
                            <section className="">
                            </section>
                        </Window>
                    </main>
                    <Shelf />
                </>
            }
        </ThemeProvider>
    );
}

export default App;
