import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Window from "@/components/window";
import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getCommandList, COMMAND_NAMES, parseArgs } from "./commands";

interface CommandHistory {
    command: string;
    output: string | string[] | null;
    code: number;
}

export default function Terminal() {
    const [cmd, setCmd] = useState("");
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [terminalHistory, setTerminalHistory] = useState<CommandHistory[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [env, setEnv] = useState({
        USER: "user",
        HOME: "/home/user",
        PWD: "/home/user",
        SHELL: "zsh-chan"
    });

    // Refs for auto-scrolling
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when terminal history changes
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollableElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') || scrollAreaRef.current;
            scrollableElement.scrollTo({ top: scrollableElement.scrollHeight, behavior: "smooth" });
        }
    }, [terminalHistory]); // Only run when terminalHistory changes

    const CMD_LIST = getCommandList(COMMAND_NAMES);

    // Handles the terminal prompt input ~
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

        let output: string | string[] | null = null;
        let code: number = 0;

        if (cmdHandler) {
            if (command === "history") {
                if (parseArgs(args) === "-c") {
                    setCmdHistory([]);
                } else {
                    output = cmdHistory;
                }
            } else if (command === "cd") {
                try {
                    const newDir = cmdHandler.execute(args, env);
                    setEnv({ ...env, PWD: newDir as string });
                } catch (error: any) {
                    output = error.message;
                    code = -1;
                }
            } else {
                output = cmdHandler.execute(args, env);
            }
        } else {
            output = [
                `( ,,⩌'︿'⩌,,) zsh-chan: command not found: ${command}`,
                "Run `help` to see available commands! (˶˃ᆺ˂˶)"
            ];
            code = -1;
        }

        command === "clear" ? setTerminalHistory([]) : setTerminalHistory(prev => [...prev, { command: cmd, output: output, code: code }]);
        setHistoryIndex(-1); // reset history index to the last command ~
        setCmd("");
    }

    const handleCmdHistoryNav = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();
            const partialCmd = e.currentTarget.value;
            if (partialCmd.length === 0) return;
            const matchedCmd = COMMAND_NAMES.find((command) => command.startsWith(partialCmd));
            if (matchedCmd) setCmd(matchedCmd);
        } else if (e.key === "ArrowUp") {
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

    return (
        <Window title="Terminal" width={800} height={400} contentClassName="p-2">
            <ScrollArea
                ref={scrollAreaRef}
                onClick={() => {
                    // Only focus if no text is being selected
                    if (!window.getSelection()?.toString()) {
                        document.getElementById("cmd-inpt")?.focus();
                    }
                }}
                className="w-full h-full">
                {terminalHistory &&
                    <section>
                        {terminalHistory.map((history, i) => {
                            return (
                                <div key={i}>
                                    <p className="text-foreground/60 flex items-center gap-0.5">
                                        <ChevronsRight />
                                        <span className={cn(history.code === 0 ? "text-emerald-400" : "text-rose-400")}>
                                            {history.command}
                                        </span>
                                    </p>
                                    {history.output && Array.isArray(history.output) ? (
                                        history.output.map((line, j) => (
                                            <p key={j} className="text-chart-5 flex items-center gap-0.5">
                                                {line}
                                            </p>
                                        ))
                                    ) : history.output && (
                                        <p className="text-chart-5 flex items-center gap-0.5">
                                            {history.output}
                                        </p>
                                    )}
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
                            className="!bg-transparent !shadow-none border-none !text-base h-6 p-0 focus-visible:ring-0" />
                    </fieldset>
                </form>
            </ScrollArea>
        </Window >
    );
}
