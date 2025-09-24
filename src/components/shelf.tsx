import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    FolderCodeIcon,
    MessageCircleIcon,
    NotebookPenIcon,
    ShellIcon,
    TerminalIcon,
    UserIcon,
    UsersIcon
} from "lucide-react";

function App({
    name,
    icon: Icon,
    isOpen,
    onClick
}: {
    name: string,
    icon: React.ComponentType<any>,
    isOpen?: boolean,
    onClick: () => void
}) {
    return (
        <Tooltip disableHoverableContent>
            <TooltipTrigger asChild className="relative group">
                <Button
                    onClick={onClick}
                    size="icon"
                    variant="outline"
                    className="hover:scale-110 size-11 rounded-xl border-none active:scale-100"
                >
                    <Icon className="size-full p-2" />
                    {
                        isOpen
                        &&
                        <small className="absolute size-2 rounded-full bottom-0 translate-y-1 bg-gradient-to-br from-[#55CDFC] to-[#F7A8B8] group-hover:size-0 duration-300"></small>
                    }
                </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={10} arrowVisible={false} className="pointer-events-none select-none">
                <p>{name}</p>
            </TooltipContent>
        </Tooltip>
    );
}


function Shelf() {
    const apps = [
        { name: "About", icon: UserIcon },
        { name: "Projects", icon: FolderCodeIcon },
        { name: "Blog", icon: NotebookPenIcon },
        { name: "Journal", icon: ShellIcon },
        { name: "Friends", icon: UsersIcon },
        { name: "Terminal", icon: TerminalIcon },
        { name: "Contact", icon: MessageCircleIcon },
    ];

    const handleAppClick = (appName: string) => {
        console.log(`Opening ${appName}`);
    }

    return (
        <div className="fixed flex items-center justify-center px-6 space-x-4 z-10 bottom-0 -translate-y-1/6 -translate-x-1/2 left-1/2 w-fit h-20 border rounded-3xl bg-card/20 backdrop-blur-md overflow-clip animate-in slide-in-from-bottom-25 zoom-in-25 duration-700 ease-in-out">
            {apps.map((app) => (
                <App
                    key={app.name}
                    name={app.name}
                    icon={app.icon}
                    isOpen={false}
                    onClick={() => handleAppClick(app.name)}
                />
            ))}
        </div>
    );
}

export default Shelf;
