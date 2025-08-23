import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AppWindow, Minimize, Minus, Square, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";

type WindowProps = {
    windowTitle?: string;
    windowIcon?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
    onClose?: () => void;
};

export default function Window({ windowTitle = "Window", windowIcon, children, className, onClose }: WindowProps) {
    const [maximized, setMaximized] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [size, updateSize] = useState({ width: "600", height: "400" });
    const [position, updatePosition] = useState({ x: window.innerWidth / 2 - 300, y: window.innerHeight / 2 - 200 });

    const toggleMax = () => {
        if (!maximized) {
            updateSize({ width: "100%", height: "100%" });
            updatePosition({ x: 0, y: 0 });
        } else {
            updateSize({ width: "600", height: "400" });
            updatePosition({ x: window.innerWidth / 2 - 300, y: window.innerHeight / 2 - 200 });
        }
        setMaximized(!maximized);
    };

    const toggleMin = () => {
        setMinimized(!minimized);
    }

    useEffect(() => {
        const handleResize = () => {
            if (!maximized) {
                updatePosition({ x: window.innerWidth / 2 - 300, y: window.innerHeight / 2 - 200 });
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [maximized]);

    return (
        <Rnd
            size={size}
            position={position}
            minWidth={600}
            minHeight={400}
            enableResizing={!maximized}
            onDragStop={(_, d) => updatePosition({ x: d.x, y: d.y })}
            onResizeStop={(_, __, ref, ___, position) => {
                updateSize({
                    width: ref.style.width,
                    height: ref.style.height,
                });
                updatePosition(position);
            }}
            className={cn("!cursor-default shadow-lg backdrop-blur-lg", className)}
        >
            {/* Title bar */}
            <div className="bg-card flex items-center justify-between border pl-4">
                <p className="text-sm flex items-center gap-2">
                    {windowIcon || <AppWindow className="inline" size={18} />}
                    {windowTitle}
                </p>
                <div className="flex items-center justify-center">
                    <Button variant="ghost" onClick={toggleMin}><Minus className="size-4" /></Button>
                    <Button variant="ghost" onClick={toggleMax}>{maximized ? <Minimize className="size-3.5 w-3.5" /> : <Square className="size-3 w-3.5" />}</Button>
                    <Button variant="ghost" onClick={onClose}><X className="size-4" /></Button>
                </div>
            </div>

            {/* Window content */}
            <div className="border bg-accent/20 backdrop-brightness-50 h-[calc(100%-38px)]">
                {children}
                {minimized && <div className="p-4">Window is minimized</div>}
            </div>
        </Rnd>
    );
}
