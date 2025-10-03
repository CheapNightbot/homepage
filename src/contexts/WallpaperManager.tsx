import { createContext, useContext, useEffect, useState } from "react";

interface WallpaperManagerType {
    wallpapers: string[];
    currentWallpaper: string;
    changingWallpaper: boolean;
    changeWallpaper: (wallpaper: string) => void;
}

const WallpaperManager = createContext<WallpaperManagerType | undefined>(undefined);

export const useWallpaperManager = () => {
    const context = useContext(WallpaperManager);
    if (!context) {
        throw new Error('useWallpaperManager must be used within a WallpaperProvider!');
    }
    return context;
}

export const WallpaperProvider = ({ children }: { children: React.ReactNode }) => {
    const dir = "/wallpapers/";
    const wallpapers = [
        dir + '0.jpg',
        dir + '1.jpg',
        dir + '2.jpg',
    ];
    const [currentWallpaper, setCurrentWallpaper] = useState("");
    const [changingWallpaper, setChangingWallpaper] = useState(false);

    useEffect(() => {
        const wallpaper = localStorage.getItem('wallpaper');
        if (wallpaper && wallpapers.includes(wallpaper)) {
            setCurrentWallpaper(wallpaper);
        } else {
            const defaultWallpaper = wallpapers[0];
            setCurrentWallpaper(defaultWallpaper);
            localStorage.setItem('wallpaper', defaultWallpaper);
        }
    }, []);

    useEffect(() => {
        if (currentWallpaper) {
            localStorage.setItem('wallpaper', currentWallpaper);
        }
    }, [currentWallpaper]);

    const changeWallpaper = (wallpaper: string) => {
        setChangingWallpaper(true);
        if (!wallpaper || !wallpapers.includes(wallpaper)) {
            throw Error("Wallpaper Not Found!");
        }
        setCurrentWallpaper(wallpaper);
        setTimeout(() => setChangingWallpaper(false), 1200);
    }

    const value = {
        wallpapers,
        currentWallpaper,
        changingWallpaper,
        changeWallpaper
    }

    return (
        <WallpaperManager.Provider value={value}>
            {children}
        </WallpaperManager.Provider>
    );
}
