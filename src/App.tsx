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

function AppContent() {
    const { windows, openWindow } = useWMContext();
    const { currentWallpaper, changingWallpaper } = useWallpaperManager();
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
            }, 2000);
        };

        window.addEventListener("load", handleLoad);
        return () => { window.removeEventListener("load", handleLoad) };
    }, []);

    return (
        <>
            {loading && <LoadingScreen />}
            {
                showContent &&
                <ContextMenu>
                    <ContextMenuTrigger>
                        <div
                            className={cn(
                                "wallpaper",
                                !loading && !changingWallpaper ? "transition-none" : "transition-all"
                            )}
                            style={{ backgroundImage: `url(${currentWallpaper})` }}
                        ></div>
                        <TopBar />
                        <Toaster position="top-center" />
                        <main id="main" className="w-screen h-[calc(100dvh-140px)]">
                            {windows
                                .filter(window => !window.minimized)
                                .map(window => {
                                    const Component = AppList[window.type];
                                    if (Component) {
                                        return <Component
                                            key={window.id}
                                            windowId={window.id}
                                            title={window.title}
                                        />
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
                        <ContextMenuItem onClick={() => openWindow('Wallpepper')}>
                            <Image />
                            Wallpaper
                        </ContextMenuItem>
                        <ContextMenuItem onClick={() => window.open(SOURCE_CODE, "_blank")}>
                            <FileCode />
                            Source Code
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            }
        </>
    );
}

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="potato-ui-theme">
            <WallpaperProvider>
                <WMProvider>
                    <AppContent />
                </WMProvider>
            </WallpaperProvider>
        </ThemeProvider>
    );
}

export default App;
