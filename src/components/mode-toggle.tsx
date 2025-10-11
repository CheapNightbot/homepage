import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useWallpaperManager } from "@/contexts/WallpaperManager";
import { cn } from "@/lib/utils";

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const { currentWallpaper } = useWallpaperManager();

    return (
        <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            variant="default"
            size="icon"
            className={cn("rounded-full !bg-transparent w-fit h-fit", currentWallpaper === "#" ? 'text-foreground/85 hover:text-foreground' : 'text-white/85 hover:text-white')}>
            <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
