import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Window from "@/components/window";

interface AppWindowIframeProps {
    info: { id: string, name: string, source: string, live: string }
}

function AppIframe({ src }: { src: string }) {
    const [loadingIframe, setLoadingIframe] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (loadingIframe) {
            const intervalId = setInterval(() => {
                setProgress((prev) => (prev < 90 ? prev + 10 : prev));
            }, 100);
            return () => clearInterval(intervalId);
        }
    }, [loadingIframe]);

    const handleLoad = () => {
        setProgress(100);
        setTimeout(() => setLoadingIframe(false), 500);
    }

    return (
        <>
            {loadingIframe && (
                <div className="relative w-full h-full flex items-center justify-center">
                    <Progress value={progress} className={cn("w-full rounded-none absolute top-0 left-0", !loadingIframe && "animate-out blur-out duration-300")} />
                    <Loader2 size={50} className={cn(loadingIframe ? "animate-spin" : "animate-out blur-out duration-300")} />
                </div>
            )}
            <iframe
                onLoad={handleLoad}
                src={src}
                className={cn("w-full h-full invisible", !loadingIframe && "visible animate-in fade-in duration-300 ease-in")}
            />
        </>
    );
}

function AppWindowIframe({ info }: AppWindowIframeProps) {
    return (
        <Window title={info.name} contextMenu={{ source: info.source, live: info.live }}>
            <AppIframe src={info.live} />
        </Window>
    );
}

export { AppIframe, AppWindowIframe };
