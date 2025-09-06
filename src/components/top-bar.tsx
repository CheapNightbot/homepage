import { ModeToggle } from "@/components/mode-toggle"
import { SITE_TITLE } from "@/constants";

function TopBar() {
    return (
        <header className="fixed top-0 left-0 w-full h-8 bg-card/20 backdrop-blur-md flex drop-shadow-md items-center justify-between px-4">
            <h1 className="text-sm font-semibold text-white/85 hover:text-white select-none transition-all duration-300 ease-in-out">{SITE_TITLE}</h1>
            <ModeToggle />
        </header>
    );
}

export default TopBar;
