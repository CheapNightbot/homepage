import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import { AppWindow, ExternalLink, FileCode2, Minimize, Minus, Square, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Rnd } from "react-rnd";


type WindowProps = {
    windowTitle?: string;
    windowAbout?: string;
    windowIcon?: string;
    appLink?: string;
    appSourceCode?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
    onFocus?: () => void;
    isMinimized?: boolean;
    isMaximized?: boolean;
    zIndex?: number;
    isFocused?: boolean;
};

export default function Window(
    {
        windowTitle = "Window",
        windowAbout,
        windowIcon,
        appLink,
        appSourceCode,
        children,
        onClose,
        onMinimize,
        onMaximize,
        onFocus,
        isMinimized = false,
        isMaximized = false,
        zIndex = 10,
        isFocused = false
    }: WindowProps) {
    const [size, updateSize] = useState({ width: "800", height: "600" });
    const [position, updatePosition] = useState({ x: window.innerWidth / 2 - 400, y: window.innerHeight / 2 - 300 });
    const [originalSize, setOriginalSize] = useState({ width: "800", height: "600" });
    const [originalPosition, setOriginalPosition] = useState({ x: window.innerWidth / 2 - 400, y: window.innerHeight / 2 - 300 });
    const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false); // Add this

    const handleMaximize = useCallback(() => {
        if (!isMaximized) {
            setOriginalSize({ ...size });
            setOriginalPosition({ ...position });
            updateSize({ width: "100%", height: "100%" });
            updatePosition({ x: 0, y: 0 });
        } else {
            updateSize({ ...originalSize });
            updatePosition({ ...originalPosition });
        }
        onMaximize?.();
    }, [isMaximized, size, position, originalSize, originalPosition, onMaximize]);

    const handleMinimize = useCallback(() => {
        onMinimize?.();
    }, [onMinimize]);

    const handleFocus = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        onFocus?.();
    }, [onFocus]);

    // Handle drag start
    const handleDragStart = useCallback(() => {
        setIsDraggingOrResizing(true);
    }, []);

    // Handle drag stop with boundary constraints
    const handleDragStop = useCallback((_: any, d: { x: number; y: number }) => {
        // Constrain position within viewport
        const maxX = window.innerWidth - 800; // minWidth
        const maxY = window.innerHeight - 600; // minHeight
        const constrainedX = Math.max(0, Math.min(d.x, maxX));
        const constrainedY = Math.max(0, Math.min(d.y, maxY));

        updatePosition({ x: constrainedX, y: constrainedY });
        setOriginalPosition({ x: constrainedX, y: constrainedY });
        setIsDraggingOrResizing(false);
    }, []);

    // Handle resize start
    const handleResizeStart = useCallback(() => {
        setIsDraggingOrResizing(true);
    }, []);

    // Handle resize stop with boundary constraints
    const handleResizeStop = useCallback((_: any, __: any, ref: HTMLElement, ___: any, position: { x: number; y: number }) => {
        // Constrain position during resize
        const maxX = window.innerWidth - ref.offsetWidth;
        const maxY = window.innerHeight - ref.offsetHeight;
        const constrainedX = Math.max(0, Math.min(position.x, maxX));
        const constrainedY = Math.max(0, Math.min(position.y, maxY));

        const newSize = {
            width: ref.style.width,
            height: ref.style.height,
        };
        updateSize(newSize);
        setOriginalSize(newSize);
        updatePosition({ x: constrainedX, y: constrainedY });
        setOriginalPosition({ x: constrainedX, y: constrainedY });
        setIsDraggingOrResizing(false);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (!isMaximized) {
                const newX = window.innerWidth / 2 - 400;
                const newY = window.innerHeight / 2 - 300;
                updatePosition({ x: newX, y: newY });
                setOriginalPosition({ x: newX, y: newY });
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMaximized]);

    if (isMinimized) {
        return null;
    }

    return (
        <Rnd
            size={{ width: size.width, height: size.height }}
            position={position}
            minWidth={800}
            minHeight={600}
            enableResizing={!isMaximized}
            disableDragging={isMaximized}
            dragHandleClassName="draggable"
            onDragStart={handleDragStart}
            onDragStop={handleDragStop}
            onResizeStart={handleResizeStart}
            onResizeStop={handleResizeStop}
            className={cn(
                "!cursor-default shadow-lg backdrop-blur-lg",
                !isDraggingOrResizing && "transition-all duration-200 ease-in-out",
                !isFocused && "brightness-75",
            )}
            style={{
                zIndex: zIndex,
                display: isMinimized ? 'none' : 'block'
            }}
            onClick={handleFocus}
            bounds="window"
        >
            {/* Title bar */}
            <ContextMenu>
                <ContextMenuTrigger>
                    <div
                        className={cn("bg-card flex items-center justify-between border pl-1 draggable", !isMaximized && "rounded-t-lg")}
                        onClick={handleFocus}
                        onDoubleClick={handleMaximize}
                    >
                        <p className="text-sm flex items-center gap-2">
                            {windowIcon ?
                                <Avatar className="p-1 w-6 h-6">
                                    <AvatarImage src={windowIcon} alt={windowTitle} />
                                    <AvatarFallback>{windowTitle.charAt(0)}</AvatarFallback>
                                </Avatar> :
                                <AppWindow className="inline p-1 w-6 h-6" />
                            }
                            {windowTitle}
                        </p>
                        <div className="flex items-center justify-center">
                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleMinimize(); }}>
                                <Minus className="size-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleMaximize(); }}>
                                {isMaximized ? <Minimize className="size-3.5 w-3.5" /> : <Square className="size-3 w-3.5" />}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onClose?.(); }}>
                                <X className="size-4" />
                            </Button>
                        </div>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem>
                        <a className="flex items-center min-w-fit" href={appSourceCode} target="_blank" rel="noopener noreferrer">
                            <FileCode2 className="inline-block mr-1" size={14} />
                            Source Code
                        </a>
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <a className="flex items-center min-w-fit" href={appLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="inline-block mr-1" size={14} />
                            Open in new tab
                        </a>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            {/* Window content */}
            <div className={cn("border bg-accent/20 backdrop-brightness-50 h-[calc(100%-62px)]", !isMaximized && "rounded-b-lg")}>
                {children}
            </div>

            {/* Footer about section */}
            <ContextMenu>
                <ContextMenuTrigger>
                    <footer className="w-full h-6 bg-accent text-sm flex items-center justify-between p-4">
                        <p title={windowAbout} className="line-clamp-1">{windowAbout}</p>
                    </footer>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem>
                        <a className="flex items-center min-w-fit" href={appSourceCode} target="_blank" rel="noopener noreferrer">
                            <FileCode2 className="inline-block mr-1" size={14} />
                            Source Code
                        </a>
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <a className="flex items-center min-w-fit" href={appLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="inline-block mr-1" size={14} />
                            Open in new tab
                        </a>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

        </Rnd >
    );
}
