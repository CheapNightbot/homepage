import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Window from "@/components/window";
import { ChevronsRight } from "lucide-react";
import { useState } from "react";

export default function Terminal() {
    const [cmd, setCmd] = useState("");
    const [cmdHistory, setCmdHistory] = useState([""]);

    // ------- Terminal Command Handlers ---------
    // `clear` command
    const handleClear = () => {
        setCmdHistory([""]);
    }

    // `echo` command
    const handleEcho = () => {
        const startQuoteIdx = cmd.indexOf('"') + 1;
        const endQuoteIdx = cmd.indexOf('"', startQuoteIdx);

        alert(cmd.slice(startQuoteIdx, endQuoteIdx));
    }

    // --------------------------------------------

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCmdHistory((prev) => [...prev, cmd]);

        const cmdHandler = CMD_LIST.find((c) => c.name === cmd);
        if (cmdHandler) {
            cmdHandler.cmd();
        } else {
            cmd.trim().length > 0 && setCmdHistory([...cmdHistory, `${cmd}: command not found!`])
        }
        setCmd("");
    }

    const handleCmdHistoryNav = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
            cmdHistory.length > 0 && setCmd(cmdHistory[0]);
        }
    }

    const CMD_LIST = [
        { name: "clear", cmd: handleClear },
        { name: "echo", cmd: handleEcho },
    ]

    return (
        <Window title="Terminal" contentClassName="px-2">
            <ScrollArea
                onClick={() => document.getElementById("cmd-inpt")?.focus()}
                className="w-full h-full">

                {cmdHistory &&
                    <section>
                        {cmdHistory.map((cmd, i) => <p className="text-foreground/80 min-h-[1ch]" key={i}>{cmd}</p>)}
                    </section>
                }
                <form
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <fieldset className="flex items-center gap-0.5">
                        <ChevronsRight />
                        <Input
                            onKeyDown={(e) => handleCmdHistoryNav(e)}
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
