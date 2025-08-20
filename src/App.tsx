import { ThemeProvider } from "@/components/theme-provider"
import Shelf from "@/components/shelf"

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Shelf />
        </ThemeProvider>
    )
}

export default App
