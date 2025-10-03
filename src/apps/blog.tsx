import { AppWindowIframe } from "@/components/app-iframe";
import type { AppProps } from "@/types/app";

export default function Blog({
    windowId,
    title = "Blog",
    width,
    height,
    className = ""
}: AppProps) {
    const info = {
        source: "https://github.com/CheapNightbot/Blog",
        live: "https://blog.cheapnightbot.me"
    }

    return <AppWindowIframe
        windowId={windowId}
        title={title}
        width={width}
        height={height}
        className={className}
        info={info} />;
}
