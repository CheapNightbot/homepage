import Window from "@/components/window";
import type { AppProps } from "@/types/app";

export default function About({
    windowId,
    title = "Contact",
    width,
    height,
    className = "",
}: AppProps) {

    return (
        <Window
            windowId={windowId}
            title={title}
            width={width}
            height={height}
            className={className}
            contentClassName="flex flex-col items-center gap-4 p-12"
        >
            NOT FINSIH ~
        </Window>
    );
}
