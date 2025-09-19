import { About } from "@/apps";
import LoadingScreen from "@/components/loading-screen";
import Shelf from "@/components/shelf";
import { ThemeProvider } from "@/components/theme-provider";
import TopBar from "@/components/top-bar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
                        <About />
                    </main>
                    <Shelf />
                </>
            }
        </ThemeProvider>
    );
}

export default App;
