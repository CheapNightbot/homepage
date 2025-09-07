import Shelf from "@/components/shelf";
import { ThemeProvider } from "@/components/theme-provider";
import TopBar from "@/components/top-bar";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";

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
                    <div className="wallpaper"></div>
                    <main className="w-screen h-screen">
                        <TopBar />
                        <Shelf />
                    </main>
                </>
            }
        </ThemeProvider>
    );
}

export default App;
