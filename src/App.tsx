import Shelf from "@/components/shelf";
import TopBar from "@/components/top-bar";
import { ThemeProvider } from "@/components/theme-provider";
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
            }, 1000);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => { window.removeEventListener("load", handleLoad) };
    }, []);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="potato-ui-theme">
            {loading && <LoadingScreen />}
            {
                showContent &&
                <>
                    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden bg-[url('/src/assets/imgs/background.jpg')] animate-in fade-in zoom-in-105 scale-110 duration-1000 ease-in-out"></div>
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
