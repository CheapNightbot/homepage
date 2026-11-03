import { useEffect, useState } from "react";
import { WallpaperManagerContext } from "./WallpaperManagerContext";

export const WallpaperProvider = ({ children }: { children: React.ReactNode }) => {
    const dir = "/wallpapers/";
    const wallpapers = [
        dir + '0.jpg',
        dir + '1.jpg',
        dir + '2.jpg',
    ];
    const [currentWallpaper, setCurrentWallpaper] = useState(() => {
        const wallpaper = localStorage.getItem('wallpaper');
        return wallpaper ? wallpaper : wallpapers[0];
    });
    const [changingWallpaper, setChangingWallpaper] = useState(false);

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

    const defaultWallpaper = () => {
        setChangingWallpaper(true);
        setCurrentWallpaper(wallpapers[0]);
        setTimeout(() => setChangingWallpaper(false), 1200);
    }

    const noWallpaper = () => {
        setChangingWallpaper(true);
        setCurrentWallpaper("#");
        setTimeout(() => setChangingWallpaper(false), 1200);
    }

    const value = {
        wallpapers,
        currentWallpaper,
        changingWallpaper,
        changeWallpaper,
        defaultWallpaper,
        noWallpaper
    }

    return (
        <WallpaperManagerContext.Provider value={value}>
            {children}
        </WallpaperManagerContext.Provider>
    );
}
