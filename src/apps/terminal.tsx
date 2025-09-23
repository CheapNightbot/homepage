import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Window from "@/components/window";
import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";
import { useState } from "react";

interface CommandHistory {
    command: string;
    output: string | null;
    code: number;
}

export default function Terminal() {
    const [cmd, setCmd] = useState("");
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [terminalHistory, setTerminalHistory] = useState<CommandHistory[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // ------- Terminal Command Handlers ---------
    // `clear` command
    const handleClear = (): null => {
        setTerminalHistory([]);
        return null;
    }

    // `echo` command
    const handleEcho = (args: string[]): string => {
        const fullArgs = args.join(' ');
        const match = fullArgs.match(/"([^"]*)"|'([^']*)'|(\S+)/);
        const text = match?.[1] || match?.[2] || match?.[3] || '';
        return text;
    }

    // `help` command
    const handleHelp = (): string => {
        const commands = CMD_LIST.map(c => c.name).join(', ');
        return `Available commands: ${commands}`;
    }

    // --------------------------------------------

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isCmd = cmd.trim().length > 0;
        isCmd && setCmdHistory((prev) => [...prev, cmd]);

        // Empty string, still want to add to terminal history for new line !!
        if (!isCmd) {
            setTerminalHistory((prev) => [...prev, { command: cmd, output: null, code: 0 }]);
            return;
        }

        const [command, ...args] = cmd.trim().split(' ');
        const cmdHandler = CMD_LIST.find((c) => c.name === command);

        let output: string | null = null;
        if (cmdHandler) {
            output = cmdHandler.cmd(args);
            cmd !== "clear" && setTerminalHistory((prev) => [...prev, { command: cmd, output: output, code: 0 }]);
        } else {
            output = `( ,,⩌'︿'⩌,,) zsh-chan: command not found: ${command}`;
            cmd.trim().length > 0 && setTerminalHistory(prev => [...prev, { command: cmd, output: output, code: -1 }]);
        }
        setHistoryIndex(-1);
        setCmd("");
    }

    const handleCmdHistoryNav = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (cmdHistory.length > 0) {
                const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setCmd(cmdHistory[newIndex] || "");
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex >= cmdHistory.length ? -1 : newIndex);
                setCmd(newIndex >= cmdHistory.length ? "" : cmdHistory[newIndex]);
            }
        }
    }

    const CMD_LIST = [
        { name: "clear", cmd: handleClear },
        { name: "echo", cmd: handleEcho },
        { name: "help", cmd: handleHelp },
    ]

    return (
        <Window title="Terminal" width={800} height={400} contentClassName="p-2">
            <ScrollArea
                onClick={() => document.getElementById("cmd-inpt")?.focus()}
                className="w-full h-full">
                {terminalHistory &&
                    <section>
                        {terminalHistory.map((history, i) => {
                            return (
                                <div key={i}>
                                    <p className="text-foreground/60 flex items-center gap-0.5">
                                        <ChevronsRight />
                                        <span className={cn(history.code === 0 ? "text-emerald-400" : "text-rose-400")}>{history.command}</span>
                                    </p>
                                    {history.output &&
                                        <p className="text-chart-5 flex items-center gap-0.5">
                                            {history.output}
                                        </p>
                                    }
                                </div>
                            );
                        })}
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
                            className="!bg-transparent !shadow-none border-none h-6 p-0 focus-visible:ring-0" />
                    </fieldset>
                </form>
            </ScrollArea>
        </Window >
    );
}
