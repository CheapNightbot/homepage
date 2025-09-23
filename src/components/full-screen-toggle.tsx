import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";
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
            className="text-white/85 hover:text-white !bg-transparent w-fit h-fit active:scale-105">
            {
                isFullscreen ? <Minimize2 className="transition-all" /> : <Maximize2 className="transition-all" />
            }
            <span className="sr-only">Toggle full screen</span>
        </Button>
    )
}
