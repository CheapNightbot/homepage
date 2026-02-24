import { Bluesky, Discord, Github, TwitterX } from "@/components/icons";
import ProfileAvatar from "@/components/profile-avatar";
import { Button } from "@/components/ui/button";
import Window from "@/components/window";
import { AUTHOR } from "@/constants";
import { copyToClipboard } from "@/lib/utils";
import type { AppProps } from "@/types/app";


function SocialButton({ url, Icon, label, onClick }: { url?: string; Icon: React.ComponentType; label: string; onClick?: () => void }) {
    return (
        <Button
            className="active:scale-95 bg-transparent hover:scale-105 transition-all duration-200 ease-in-out"
            onClick={onClick || (() => window.open(url, "_blank", "noreferrer noopener"))}
            size="icon"
            variant="ghost"
        >
            <Icon />
            <small className="sr-only">{label}</small>
        </Button>
    );
}

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
                    <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-fuchsia-400  dark:from-[#92a4ff] dark:to-[#ffa9d3]">{AUTHOR}</h2>
                    <div>
                        <SocialButton url="https://bsky.app/profile/cheapnightbot.me" Icon={Bluesky} label="Bluesky" />
                        <SocialButton onClick={async () => await copyToClipboard("cheapnightbot", "Discord username copied to the clipboard!")} Icon={Discord} label="Discord" />
                        <SocialButton url="https://github.com/CheapNightbot" Icon={Github} label="GitHub" />
                        <SocialButton url="https://x.com/CheapNightbot" Icon={TwitterX} label="X (Formerly Twitter)" />
                    </div>
                </div>
            </section>
        </Window>
    );
}
