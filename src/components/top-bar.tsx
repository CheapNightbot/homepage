import { ModeToggle } from "@/components/mode-toggle"
import { SITE_TITLE } from "@/constants";
import { FullScreenToggle } from "./full-screen-toggle";
import { Shell } from "lucide-react";

function TopBar() {
    return (
        <header
            onContextMenu={(uwu) => uwu.preventDefault()}
            className="w-full h-8 bg-card/20 backdrop-blur-md flex drop-shadow-md items-center justify-between px-4 z-10">
            <div className="flex items-center gap-2">
                <Shell size={18} className="animate-in spin-in-[360deg] fade-in duration-500 ease-in" />
                <h1 className="text-sm font-semibold text-white/85 hover:text-white select-none transition-all duration-300 ease-in-out">
                    {SITE_TITLE}
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <ModeToggle />
                <FullScreenToggle />
            </div>
        </header>
    );
}

export default TopBar;
