import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from '@/lib/utils';
import { Circle, FileCode, Minus, Plus, SquareArrowOutUpRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { Button } from './ui/button';

interface WindowProps {
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
    title,
    children,
    className = "",
    contentClassName = "",
    contextMenu,
    width = INIT_WIDTH,
    height = INIT_HEIGHT
}: WindowProps) {
    const mainElm = document.getElementById('main');

    const [winWidth, setWinWidth] = useState(width);
    const [winHeight, setWinHeight] = useState(height);
    const [posX, setPosX] = useState((window.innerWidth - winWidth) / 2);
    const [posY, setPosY] = useState((window.innerHeight - (winHeight + 140)) / 2);

    const [maximized, setMaximized] = useState(false);
    const [allowTransitions, setAllowTransitions] = useState(true);

    const handleMaximize = () => {
        setAllowTransitions(true);
        if (!maximized) {
            setWinWidth(mainElm ? mainElm.clientWidth - 32 : window.innerWidth - 32);
            setWinHeight(mainElm ? mainElm.clientHeight - 22 : window.innerHeight - BOTTOM_OFFSET);
            setPosX(16);
            setPosY(16);
        } else {
            setWinWidth(width);
            setWinHeight(height);
            setPosX(mainElm ? (mainElm.clientWidth - width) / 2 : (window.innerWidth - width) / 2);
            setPosY(mainElm ? (mainElm.clientHeight - height) / 2 : (window.innerHeight - height) / 2);
        }
        setMaximized(!maximized);
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

    return (
        <Rnd
            bounds="parent"
            cancel='.actions'
            className={cn('overflow-clip flex flex-col rounded-2xl', allowTransitions && 'transition-all duration-300 ease-in-out', className)}
            default={{
                x: posX,
                y: posY,
                width: winWidth,
                height: winHeight,
            }}
            dragHandleClassName='nav-bar'
            disableDragging={maximized}
            enableResizing={!maximized}
            onResizeStart={() => setAllowTransitions(false)}
            onResizeStop={(_, __, ___, delta, ____) => {
                if (!maximized) {
                    setWinWidth((prev) => prev + delta.width);
                    setWinHeight((prev) => prev + delta.height);
                    setAllowTransitions(true);
                }
            }}
            onDragStart={() => setAllowTransitions(false)}
            onDragStop={(_, data) => {
                if (!maximized) {
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
            <header onContextMenu={(uwu) => uwu.preventDefault()} onDoubleClick={handleMaximize} className='nav-bar bg-card px-4 h-8 flex justify-between items-center select-none gap-2'>
                <h2 className='text-sm'>{title || 'Title'}</h2>
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
                    <Button onClick={handleMaximize} variant="ghost" size="icon" className='relative rounded-full size-4 active:scale-95'>
                        <Circle fill='green' stroke='none' />
                        <Plus className='absolute size-2.5 left-1/2 top-1/2 -translate-1/2 border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ' />
                    </Button>
                    {/* minimize button */}
                    <Button variant="ghost" size="icon" className='relative rounded-full size-4 active:scale-95'>
                        <Circle fill='orange' stroke='none' />
                        <Minus className='absolute size-2.5 left-1/2 top-1/2 -translate-1/2 border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ' />
                    </Button>
                    {/* close button */}
                    <Button variant="ghost" size="icon" className='relative rounded-full size-4 active:scale-95'>
                        <Circle fill='red' stroke='none' />
                        <X className='absolute size-2.5 left-1/2 top-1/2 -translate-1/2 border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ' />
                    </Button>
                </nav>
            </header>
            <div onContextMenu={(uwu) => uwu.preventDefault()} className={cn('w-full h-[calc(100%-32px)] rounded-b-2xl bg-card/50 text-card-foreground backdrop-blur-3xl', contentClassName)}>
                {children}
            </div>
        </Rnd>
    );
}

export default Window;
