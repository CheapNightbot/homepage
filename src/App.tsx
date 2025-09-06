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
            <main className="w-screen h-screen">
                <TopBar />
                <Shelf />
            </main>
        </ThemeProvider>
    );
}

export default App;
