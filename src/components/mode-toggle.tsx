import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")} variant="default" size="icon" className="rounded-full size-5 !bg-transparent w-fit h-fit focus-visible:ring-0">
            <Sun className="h-[1rem] w-[1rem] text-primary scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1rem] w-[1rem] text-white scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
