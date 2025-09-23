import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Window from "@/components/window";
import { ChevronsRight } from "lucide-react";
import { useState } from "react";


export default function Terminal() {
    const [cmd, setCmd] = useState("");
    const [topOffset, setTopOffset] = useState(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCmd("");

        if (cmd === "clear") {
            setTopOffset(0);
        } else {
            setTopOffset((prev) => prev + 10);
        }
    }

    return (
        <Window title="Terminal" contentClassName="px-2">
            <ScrollArea
                onClick={() => document.getElementById("cmd-inpt")?.focus()}
                className="w-full h-full">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <fieldset style={{ marginTop: topOffset }} className="flex items-center gap-0.5">
                        <ChevronsRight />
                        <Input
                            id="cmd-inpt"
                            value={cmd}
                            onChange={(e) => setCmd(e.currentTarget.value)}
                            autoFocus
                            className="!bg-transparent !shadow-none border-none p-0 focus-visible:ring-0" />
                    </fieldset>
                </form>
            </ScrollArea>
        </Window >
    );
}
