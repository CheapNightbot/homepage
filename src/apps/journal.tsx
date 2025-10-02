import { AppWindowIframe } from "@/components/app-iframe";
import type { AppProps } from "@/types/app";

export default function Journal({
    windowId,
    title = "Journal",
    width,
    height
}: AppProps) {
    const info = {
        source: "https://github.com/CheapNightbot/Journal",
        live: "https://journal.cheapnightbot.me"
    }

    return <AppWindowIframe
        windowId={windowId}
        title={title}
        width={width}
        height={height}
        info={info} />;
}
