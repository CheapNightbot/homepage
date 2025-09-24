import { ModeToggle } from "@/components/mode-toggle"
import { SITE_TITLE } from "@/constants";
import { FullScreenToggle } from "./full-screen-toggle";

function TopBar() {
    return (
        <header className="w-full h-8 bg-card/20 backdrop-blur-md flex drop-shadow-md items-center justify-between px-4 z-10">
            <h1 className="text-sm font-semibold text-white/85 hover:text-white select-none transition-all duration-300 ease-in-out">
                {SITE_TITLE}
            </h1>
            <div className="flex items-center gap-4">
                <ModeToggle />
                <FullScreenToggle />
            </div>
        </header>
    );
}

export default TopBar;
