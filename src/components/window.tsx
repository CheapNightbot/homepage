import { Rnd } from "react-rnd";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { X, Square, Minus, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";

type WindowProps = {
    windowTitle?: string;
    className?: string;
    children?: React.ReactNode;
};

export default function Window({ windowTitle = "Window", children, className }: WindowProps) {
    const [maximized, setMaximized] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    const toggleMax = () => setMaximized(!maximized);

    useEffect(() => {
        if (maximized) {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        } else {
            setWindowSize({ width: 612, height: 364 });
        }
    }, [maximized]);

    return (
        <Rnd
            default={{
                x: window.innerWidth / 2 - 300,
                y: window.innerHeight / 2 - 200,
                width: 400,
                height: 200,
            }}
            minWidth={windowSize.width}
            minHeight={windowSize.height}
            enableResizing={!maximized}
            className={cn("!cursor-default shadow-lg backdrop-blur-lg", className)}
        >
            {/* Title bar */}
            <div className="bg-card flex items-center justify-between border pl-4">
                <p className="text-sm">{windowTitle}</p>
                <div className="flex items-center justify-center">
                    <Button variant="ghost" onClick={() => console.log("minimize")}><Minus className="size-4" /></Button>
                    <Button variant="ghost" onClick={toggleMax}>{maximized ? <Minimize className="size-3.5 w-3.5" /> : <Square className="size-3 w-3.5" />}</Button>
                    <Button variant="ghost" onClick={() => console.log("close")}><X className="size-4" /></Button>
                </div>
            </div>

            {/* Window content */}
            <div className="border bg-accent/20 backdrop-brightness-50 h-[calc(100%-38px)]">
                {children}
            </div>
        </Rnd>
    );
}
