import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Expand, Shrink } from "lucide-react";
import { useEffect, useState } from "react";

export function FullScreenToggle() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleToggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        } else {
            document.body.requestFullscreen();
            setIsFullscreen(true);
        }
    }

    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        }

        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    return (
        <Button
            onClick={handleToggleFullscreen}
            variant="default"
            size="icon"
            className={cn("text-white/85 hover:text-white !bg-transparent w-fit h-fit", isFullscreen ? "active:scale-95" : "active:scale-105")}>
            {
                isFullscreen ? <Shrink className="transition-all" /> : <Expand className="transition-all" />
            }
            <span className="sr-only">Toggle full screen</span>
        </Button>
    )
}
