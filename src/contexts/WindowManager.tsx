import { type WindowManagerContextType, type WindowState } from "@/types/window";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


const WMContext = createContext<WindowManagerContextType | undefined>(undefined);

export const useWMContext = () => {
    const context = useContext(WMContext);
    if (!context) {
        throw new Error('useWMContext must be used within a WMProvider!');
    }
    return context;
}

export const WMProvider = ({ children }: { children: React.ReactNode }) => {
    const [windows, setWindows] = useState<WindowState[]>([]);

    useEffect(() => {
        const storedWindows = localStorage.getItem('windows');
        if (storedWindows) {
            try {
                setWindows(JSON.parse(storedWindows));
            } catch {
                setWindows([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('windows', JSON.stringify(windows));
    }, [windows]);

    // ---- Hwelpwer fwenctions ~ QwQ !
    const openWindow = (type: string, title?: string, width?: number, height?: number): string => {
        // Check if window of this type exists (either open or minimized)
        const existingWindow = windows.find(w => w.type === type);

        if (existingWindow) {
            if (existingWindow.minimized) {
                // If it's minimized, restore it
                setWindows(prev =>
                    prev.map(w =>
                        w.id === existingWindow.id
                            ? { ...w, minimized: false, focused: true }
                            : { ...w, focused: false } // Unfocus other windows
                    )
                );
                return existingWindow.id;
            } else {
                // If it's already open and focused, minimize it
                setWindows(prev =>
                    prev.map(w =>
                        w.id === existingWindow.id
                            ? { ...w, minimized: true, focused: false }
                            : w
                    )
                );
                return existingWindow.id;
            }
        }

        // If no existing window, create a new one
        const newWindow: WindowState = {
            id: uuidv4(),
            type,
            title,
            minimized: false,
            maximized: false,
            focused: true,
            width,
            height,
        };

        setWindows(prev => {
            // Unfocus all other windows
            const unfocusedWindows = prev.map(w => ({ ...w, focused: false }));
            return [...unfocusedWindows, newWindow];
        });

        return newWindow.id;
    };

    const closeWindow = (id: string) => {
        setWindows(prev => prev.filter(w => w.id !== id));
    };

    const minimizeWindow = (id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true, focused: false } : w));
    };

    const maximizeWindow = (id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, maximized: true } : w));
    };

    const restoreWindow = (id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, maximized: false } : w));
    };

    const focusWindow = (id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, focused: true } : { ...w, focused: false }));
    };

    const isWindowOpen = (type: string): boolean => {
        return windows.some(w => w.type === type);
    };

    const value = {
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        restoreWindow,
        isWindowOpen
    };

    return (
        <WMContext.Provider value={value}>
            {children}
        </WMContext.Provider>
    );
};
