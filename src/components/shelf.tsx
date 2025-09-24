import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    FolderCodeIcon,
    MessageCircleIcon,
    UserIcon,
    NotebookPenIcon,
    ShellIcon,
    UsersIcon,
    TerminalIcon

} from "lucide-react";

function App({ name, children, isOpen }: { name: string, children: any, isOpen?: boolean }) {
    return (
        <Tooltip disableHoverableContent>
            <TooltipTrigger asChild className="relative group">
                <Button onClick={() => console.log("lazy potato didn't implement it yet ~")} size="icon" variant="outline" className="hover:scale-110 size-11 rounded-xl border-none active:scale-100">
                    {children}
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
    return (
        <div className="fixed flex items-center justify-center px-6 space-x-4 z-10 bottom-0 -translate-y-1/6 -translate-x-1/2 left-1/2 w-fit h-20 border rounded-3xl bg-card/20 backdrop-blur-md overflow-clip animate-in slide-in-from-bottom-25 zoom-in-25 duration-700 ease-in-out">
            <App name="About" isOpen={true}>
                <UserIcon className="size-full p-2" />
            </App>
            <App name="Projects">
                <FolderCodeIcon className="size-full p-2" />
            </App>
            <App name="Blog">
                <NotebookPenIcon className="size-full p-2" />
            </App>
            <App name="Journal">
                <ShellIcon className="size-full p-2" />
            </App>
            <App name="Friends">
                <UsersIcon className="size-full p-2" />
            </App>
            <App name="Terminal">
                <TerminalIcon className="size-full p-2" />
            </App>
            <App name="Contact">
                <MessageCircleIcon className="size-full p-2" />
            </App>
        </div>
    );
}

export default Shelf;
