import Shelf from "@/components/shelf";
import TopBar from "@/components/top-bar";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => setLoading(false);
        window.addEventListener("load", handleLoad);

        return () => { window.removeEventListener("load", handleLoad) };
    }, []);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="potato-ui-theme">
            {loading && <LoadingScreen />}
            {
                !loading &&
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
