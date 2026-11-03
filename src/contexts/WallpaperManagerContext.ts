import { createContext, useContext } from "react";

interface WallpaperManagerType {
    wallpapers: string[];
    currentWallpaper: string;
    changingWallpaper: boolean;
    changeWallpaper: (wallpaper: string) => void;
    defaultWallpaper: () => void;
    noWallpaper: () => void;
}

export const WallpaperManagerContext = createContext<WallpaperManagerType | undefined>(undefined);

export const useWallpaperManager = () => {
    const context = useContext(WallpaperManagerContext);
    if (!context) {
        throw new Error('useWallpaperManager must be used within a WallpaperProvider!');
    }
    return context;
};