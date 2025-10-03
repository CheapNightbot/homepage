import { Button } from '@/components/ui/button';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWMContext } from "@/contexts/WindowManager";
import { cn } from '@/lib/utils';
import { Circle, FileCode, Minus, Plus, SquareArrowOutUpRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';

interface WindowProps {
    windowId: string;
    title: string;
    children?: any;
    className?: string;
    contentClassName?: string;
    contextMenu?: { source: string, live: string };
    width?: number;
    height?: number;
};

const BOTTOM_OFFSET = 160;
const INIT_WIDTH = 460;
const INIT_HEIGHT = 540;

function Window({
    windowId,
    title,
    children,
    className = "",
    contentClassName = "",
    contextMenu,
    width = INIT_WIDTH,
    height = INIT_HEIGHT,
}: WindowProps) {
    const {
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        focusWindow,
        windows
    } = useWMContext();

    // Get the current window's state from the context
    const windowState = windows.find(w => w.id === windowId);
    const isMaximized = windowState?.maximized || false;
    const isFocused = windowState?.focused || false;

    const mainElm = document.getElementById('main');

    const [winWidth, setWinWidth] = useState(width);
    const [winHeight, setWinHeight] = useState(height);
    const [posX, setPosX] = useState((window.innerWidth - winWidth) / 2);
    const [posY, setPosY] = useState((window.innerHeight - (winHeight + 140)) / 2);

    const [allowTransitions, setAllowTransitions] = useState(false);

    const handleMaximize = () => {
        if (isMaximized) {
            restoreWindow(windowId);
        } else {
            maximizeWindow(windowId);
        }
    }

    const handleBrowserResize = () => {
        const mainElment = document.getElementById('main');
        setPosX(mainElment ? (mainElment.clientWidth - winWidth) / 2 : (window.innerWidth - winWidth) / 2);
        setPosY(mainElment ? (mainElment.clientHeight - winHeight) / 2 : (window.innerHeight - winHeight) / 2);
    }

    useEffect(() => {
        window.addEventListener("resize", handleBrowserResize);
        return () => { window.removeEventListener("resize", handleBrowserResize) };
    }, [winWidth, winHeight]);

    // Update dimensions when window is maximized/restored
    useEffect(() => {
        if (mainElm && isMaximized) {
            setWinWidth(mainElm.clientWidth - 32);
            setWinHeight(mainElm.clientHeight - 22);
            setPosX(16);
            setPosY(16);
        } else {
            setWinWidth(width);
            setWinHeight(height);
            setPosX(mainElm ? (mainElm.clientWidth - width) / 2 : (window.innerWidth - width) / 2);
            setPosY(mainElm ? (mainElm.clientHeight - height) / 2 : (window.innerHeight - BOTTOM_OFFSET) / 2);
        }
    }, [isMaximized, width, height, mainElm]);

    return (
        <Rnd
            onClick={() => focusWindow(windowId)}
            windowid={windowId}
            bounds="parent"
            cancel='.actions'
            className={cn(
                'overflow-clip flex flex-col rounded-2xl',
                allowTransitions && 'transition-all duration-300 ease-in-out',
                isFocused && 'z-10',
                className
            )}
            default={{
                x: posX,
                y: posY,
                width: winWidth,
                height: winHeight,
            }}
            dragHandleClassName='nav-bar'
            disableDragging={isMaximized}
            enableResizing={!isMaximized}
            onResizeStart={() => setAllowTransitions(false)}
            onResizeStop={(_, __, ___, delta, ____) => {
                if (!isMaximized) {
                    setWinWidth((prev) => prev + delta.width);
                    setWinHeight((prev) => prev + delta.height);
                    setAllowTransitions(true);
                }
            }}
            onDragStart={() => setAllowTransitions(false)}
            onDragStop={(_, data) => {
                if (!isMaximized) {
                    setPosX(data.x);
                    setPosY(data.y);
                    setAllowTransitions(true);
                }
            }}
            minWidth={460}
            minHeight={540}
            position={{ x: posX, y: posY }}
            size={{ width: winWidth, height: winHeight }}
        >
            <header
                onContextMenu={(uwu) => uwu.preventDefault()}
                onDoubleClick={handleMaximize}
                className={cn(
                    'nav-bar bg-card px-4 h-8 flex justify-between items-center select-none gap-2',
                    !isFocused && 'saturate-50'
                )}
            >
                <h2 className={cn(
                    'text-sm transition-all duration-300 ease-in-out',
                    !isFocused && 'text-foreground/80'
                )}
                >
                    {title || 'Title'}
                </h2>
                {
                    contextMenu &&
                    <ContextMenu >
                        <ContextMenuTrigger className='flex-1 h-full' />
                        <ContextMenuContent>
                            <ContextMenuItem onClick={() => window.open(contextMenu.source, "_blank")}>
                                <FileCode />
                                Source Code
                            </ContextMenuItem>
                            <ContextMenuItem onClick={() => window.open(contextMenu.live, "_blank")}>
                                <SquareArrowOutUpRight />
                                Open in New Tab
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                }
                <nav className='actions group flex items-center gap-2 text-background'>
                    {/* maximize button */}
                    <Button
                        onClick={handleMaximize}
                        variant="ghost"
                        size="icon"
                        className='relative rounded-full size-4 active:scale-95'>
                        {isFocused
                            ? <Circle fill='green' stroke='none' className="transition-all duration-300 ease-in-out" />
                            : <Circle fill='gray' stroke='none' className="transition-all duration-300 ease-in-out" />
                        }
                        <Plus className='absolute size-2.5 left-1/2 top-1/2 -translate-1/2 border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ' />
                    </Button>
                    {/* minimize button */}
                    <Button
                        onClick={() => minimizeWindow(windowId)}
                        variant="ghost"
                        size="icon"
                        className='relative rounded-full size-4 active:scale-95'>
                        {isFocused
                            ? <Circle fill='orange' stroke='none' className="transition-all duration-300 ease-in-out" />
                            : <Circle fill='gray' stroke='none' className="transition-all duration-300 ease-in-out" />
                        }
                        <Minus className='absolute size-2.5 left-1/2 top-1/2 -translate-1/2 border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ' />
                    </Button>
                    {/* close button */}
                    <Button onClick={() => closeWindow(windowId)}
                        variant="ghost"
                        size="icon"
                        className='relative rounded-full size-4 active:scale-95'>
                        {isFocused
                            ? <Circle fill='red' stroke='none' className="transition-all duration-300 ease-in-out" />
                            : <Circle fill='gray' stroke='none' className="transition-all duration-300 ease-in-out" />
                        }
                        <X className='absolute size-2.5 left-1/2 top-1/2 -translate-1/2 border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ' />
                    </Button>
                </nav>
            </header>
            <ScrollArea
                onContextMenu={(uwu) => uwu.preventDefault()}
                className={cn(
                    'w-full h-[calc(100%-32px)] rounded-b-2xl text-card-foreground bg-card/50 backdrop-blur-3xl',
                    contentClassName)}>
                {children}
            </ScrollArea>
        </Rnd>
    );
}

export default Window;
