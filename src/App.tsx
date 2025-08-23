import { ThemeProvider } from "@/components/theme-provider"
import Shelf from "@/components/shelf"
import Window from "@/components/window"

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Shelf />
            <Window></Window>
        </ThemeProvider>
    )
}

export default App
