import { AppList } from "@/apps";
import LoadingScreen from "@/components/loading-screen";
import Shelf from "@/components/shelf";
import { ThemeProvider } from "@/components/theme-provider";
import TopBar from "@/components/top-bar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { FileCode, Image, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { SOURCE_CODE } from "./constants.ts";
import { useWallpaperManager, WallpaperProvider } from "./contexts/WallpaperManager";
import { useWMContext, WMProvider } from "./contexts/WindowManager";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";

function AppContent() {
  const { windows, openWindow } = useWMContext();
  const { currentWallpaper, changingWallpaper } = useWallpaperManager();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn(
            "wallpaper",
            changingWallpaper ? "transition-all" : "transition-none"
          )}
          style={{ backgroundImage: `url(${currentWallpaper})` }}
        ></div>
        <TopBar />
        <Toaster position="top-center" />
        <main id="main" className="w-screen h-[calc(100dvh-140px)]">
          {windows
            // .filter(window => !window.minimized)
            .map(window => {
              const Component = AppList[window.type];
              if (Component) {
                return <Component key={window.id} windowId={window.id} title={window.title} />;
              }
              return null
            })}
        </main>
        <Shelf />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => location.reload()}>
          <RefreshCw />
          Refresh
        </ContextMenuItem>
        <ContextMenuItem onClick={() => openWindow('Wallpepper')}>  {/* to future me: it's not a typo, did on purpose!!! 🤦‍♀️ */}
          <Image />
          Wallpaper
        </ContextMenuItem>
        <ContextMenuItem onClick={() => window.open(SOURCE_CODE, "_blank")}>
          <FileCode />
          Source Code
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.sessionStorage.getItem("hasShownLoading") === "true") {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      window.sessionStorage.setItem("hasShownLoading", "true");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="potato-ui-theme">
      <WallpaperProvider>
        <WMProvider>
          <TooltipProvider>
            {/* Loading Screen */}
            <div className={cn(
              "pointer-events-none opacity-0",
              loading && "opacity-100",
              !loading && "invisible animate-out fade-out duration-1500 ease-out fill-mode-forwards"
            )}>
              <LoadingScreen />
            </div>

            {/* Main App Content */}
            <section className={cn(
              "transition-opacity duration-300 ease-in block",
              loading && "hidden"
            )}>
              <AppContent />
            </section>
          </TooltipProvider>
        </WMProvider>
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;
