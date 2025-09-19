import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    FolderCode,
    MessageCircle,
    User,
    NotebookPen,
    Shell
} from "lucide-react";

function App({ name, children }: { name: string, children: any }) {
    return (
        <Tooltip disableHoverableContent>
            <TooltipTrigger asChild>
                <Button onClick={() => console.log("lazy potato didn't implement it yet ~")} size="icon" variant="outline" className="hover:scale-110 size-11 rounded-xl border-none active:scale-100">
                    {children}
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
            <App name="About">
                <User className="size-full p-2" />
            </App>
            <App name="Projects">
                <FolderCode className="size-full p-2" />
            </App>
            <App name="Blog">
                <NotebookPen className="size-full p-2" />
            </App>
            <App name="Journal">
                <Shell className="size-full p-2" />
            </App>
            <App name="Contact">
                <MessageCircle className="size-full p-2" />
            </App>
        </div>
    );
}

export default Shelf;
