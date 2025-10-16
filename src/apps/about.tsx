import { Bluesky, Discord, Github, Mastodon, TwitterX, YouTube } from "@/components/icons";
import ProfileAvatar from "@/components/profile-avatar";
import { Button } from "@/components/ui/button";
import Window from "@/components/window";
import { copyToClipboard } from "@/lib/utils";
import type { AppProps } from "@/types/app";

export default function About({
    windowId,
    title = "About",
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
            <section className="flex flex-col items-center gap-6">
                <ProfileAvatar />
                <div className="flex-1 flex flex-col items-center">
                    <p>yoho, me a boiled potato ~</p>
                    <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-400  dark:from-[#92a4ff] dark:to-[#ffa9d3]">Cheap Nightbot</h2>
                    <div>
                        <Button onClick={() => window.open("https://bsky.app/profile/cheapnightbot.me", "_blank")} variant="ghost" size="icon" className="active:scale-95 bg-transparent">
                            <Bluesky />
                            <small className="sr-only">Bluesky</small>
                        </Button>
                        <Button onClick={async () => await copyToClipboard("cheapnightbot", "Discord username copied to the clipboard!")} variant="ghost" size="icon" className="active:scale-95 bg-transparent">
                            <Discord />
                            <small className="sr-only">Discord</small>
                        </Button>
                        <Button onClick={() => window.open("https://github.com/CheapNightbot", "_blank")} variant="ghost" size="icon" className="active:scale-95 bg-transparent">
                            <Github />
                            <small className="sr-only">GitHub</small>
                        </Button>
                        <Button onClick={() => window.open("https://mastodon.social/@CheapNightbot", "_blank")} variant="ghost" size="icon" className="active:scale-95 bg-transparent">
                            <Mastodon />
                            <small className="sr-only">Mastodon</small>
                        </Button>
                        <Button onClick={() => window.open("https://x.com/CheapNightbot", "_blank")} variant="ghost" size="icon" className="active:scale-95 bg-transparent">
                            <TwitterX />
                            <small className="sr-only">X (Formerly Twitter)</small>
                        </Button>
                        <Button onClick={() => window.open("https://youtube.com/@CheapNightbot", "_blank")} variant="ghost" size="icon" className="active:scale-95 bg-transparent">
                            <YouTube />
                            <small className="sr-only">X (Formerly Twitter)</small>
                        </Button>
                    </div>
                </div>
            </section>
        </Window>
    );
}
