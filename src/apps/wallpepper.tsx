import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Window from "@/components/window";
import { useWallpaperManager } from "@/contexts/WallpaperManager";
import type { AppProps } from "@/types/app";
import { CircleCheck } from "lucide-react";

export default function Wallpepper({
    windowId,
    title = "Wallpaper Manager",
    width = 700,
    height = 600,
}: AppProps) {
    const { wallpapers, currentWallpaper, changeWallpaper } = useWallpaperManager();

    return (
        <Window
            windowId={windowId}
            title={title}
            width={width}
            height={height}
            contentClassName="flex flex-col items-center justify-center gap-4 p-10"
        >
            <section className="flex flex-col items-center gap-6">
                <Avatar className="rounded-md w-sm h-65 border-2 border-primary relative shadow">
                    <AvatarImage src={currentWallpaper} className="animate-in fade-in duration-700 ease-in-out" />
                    <AvatarFallback className="size-full rounded-md">
                        <Skeleton className="size-full" />
                    </AvatarFallback>
                    <CircleCheck className="absolute text-green-300 bottom-0 right-0 -translate-1/4 rounded-full" />
                </Avatar>

                <div className="grid grid-cols-2 gap-6">
                    {wallpapers.filter(wallpaper => wallpaper !== currentWallpaper).map(wallpaper => {
                        return (
                            <Avatar
                                key={wallpaper.split("/").at(2)?.split(".").at(0)}
                                onClick={() => changeWallpaper(wallpaper)}
                                className="rounded-md w-2xs h-50 border">
                                <AvatarImage src={wallpaper} className="animate-in fade-in duration-500 ease-in-out" />
                                <AvatarFallback className="size-full rounded-md">
                                    <Skeleton className="size-full" />
                                </AvatarFallback>
                            </Avatar>
                        );
                    })}
                </div>
            </section>
        </Window>
    );
}
