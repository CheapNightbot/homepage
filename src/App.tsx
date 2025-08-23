import { ThemeProvider } from "@/components/theme-provider"
import Shelf from "@/components/shelf"
import Window from "@/components/window"
import { apps } from "@/lib/apps";
import { projects } from "@/lib/projects";

function App() {
    const appList = [...projects, ...apps];

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <main className="relative h-[calc(100vh-4rem)]">
                <Window>
                    <div className="flex flex-col items-center justify-center h-full text-2xl text-center text-muted-foreground">
                        <p>Welcome to my portfolio!</p>
                        <p>Click the launcher button on the left to see my projects and apps.</p>
                        <p>Or press <code>Ctrl + A</code> to open the launcher.</p>
                    </div>
                </Window>
            </main>
            <Shelf appList={appList} />
        </ThemeProvider>
    )
}

export default App
