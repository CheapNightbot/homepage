import Shelf from "@/components/shelf";
import TopBar from "@/components/top-bar";
import { ThemeProvider } from "@/components/theme-provider";

function App() {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="potato-ui-theme">
            <main className="w-screen h-screen">
                <TopBar />
                <Shelf />
            </main>
        </ThemeProvider>
    );
}

export default App;
