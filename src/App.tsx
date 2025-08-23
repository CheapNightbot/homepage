import Shelf from "@/components/shelf";
import { ThemeProvider } from "@/components/theme-provider";
import Window from "@/components/window";
import { apps } from "@/lib/apps";
import { projects } from "@/lib/projects";
import { WindowManager } from "@/lib/window-manager";
import { useCallback, useEffect, useState } from "react";

function App() {
    const appList = [...projects, ...apps];
    const [windows, setWindows] = useState<ReturnType<typeof WindowManager.prototype.getWindows>>([]);
    const windowManager = WindowManager.getInstance();

    // Update windows when window manager changes
    useEffect(() => {
        const updateWindows = () => {
            setWindows(windowManager.getWindows());
        };

        updateWindows();
    }, []);

    const handleOpenApp = useCallback((app: typeof appList[0]) => {
        windowManager.openWindow(app);
        setWindows(windowManager.getWindows());
    }, [windowManager]);

    const handleCloseWindow = useCallback((windowId: string) => {
        windowManager.closeWindow(windowId);
        setWindows(windowManager.getWindows());
    }, [windowManager]);

    const handleMinimizeWindow = useCallback((windowId: string) => {
        windowManager.minimizeWindow(windowId);
        setWindows(windowManager.getWindows());
    }, [windowManager]);

    const handleMaximizeWindow = useCallback((windowId: string) => {
        windowManager.maximizeWindow(windowId);
        setWindows(windowManager.getWindows());
    }, [windowManager]);

    const handleUnmaximizeWindow = useCallback((windowId: string) => {
        windowManager.unmaximizeWindow(windowId);
        setWindows(windowManager.getWindows());
    }, [windowManager]);

    const handleRestoreWindow = useCallback((windowId: string) => {
        windowManager.restoreWindow(windowId);
        setWindows(windowManager.getWindows());
    }, [windowManager]);

    const handleWindowFocus = useCallback((windowId: string) => {
        windowManager.bringToFront(windowId);
        setWindows(windowManager.getWindows());
    }, [windowManager]);

    // Get maximized windows for shelf styling
    const maximizedWindows = windows.filter(w => w.isMaximized && !w.isClosed);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <main className="relative h-[calc(100vh-4rem)]">
                {/* Dynamic windows */}
                {windows.map(windowState => (
                    !windowState.isClosed && (
                        <Window
                            key={windowState.id}
                            windowTitle={windowState.app.name}
                            windowAbout={windowState.app.description}
                            appLink={windowState.app.live}
                            appSourceCode={windowState.app.github}
                            windowIcon={windowState.app.image}
                            isMinimized={windowState.isMinimized}
                            isMaximized={windowState.isMaximized}
                            zIndex={windowState.zIndex}
                            isFocused={windowManager.isWindowFocused(windowState.id)}
                            onClose={() => handleCloseWindow(windowState.id)}
                            onMinimize={() => handleMinimizeWindow(windowState.id)}
                            onMaximize={() => {
                                if (windowState.isMaximized) {
                                    handleUnmaximizeWindow(windowState.id);
                                } else {
                                    handleMaximizeWindow(windowState.id);
                                }
                            }}
                            onFocus={() => handleWindowFocus(windowState.id)}
                        >
                            <div className="w-full h-full">
                                <iframe className="w-full h-full" src={windowState.app.live}></iframe>
                            </div>
                        </Window>
                    )
                ))}
            </main>
            <Shelf
                appList={appList}
                onOpenApp={handleOpenApp}
                openWindows={windows.filter(w => !w.isClosed)}
                maximizedWindows={maximizedWindows}
                onRestoreWindow={handleRestoreWindow}
            />
        </ThemeProvider>
    )
}

export default App
