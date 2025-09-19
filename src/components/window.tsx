import { cn } from '@/lib/utils';
import { Circle, Minus, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { Button } from './ui/button';

interface WindowProps {
    title: string,
    children: any,
    className: string
};

const BOTTOM_PADDING = 160;
const INIT_WIDTH = 460;
const INIT_HEIGHT = 540;

function Window({ title, children, className }: WindowProps) {
    const mainElm = document.getElementById('main');

    const [winWidth, setWinWidth] = useState(INIT_WIDTH);
    const [winHeight, setWinHeight] = useState(INIT_HEIGHT);
    const [posX, setPosX] = useState((window.innerWidth - winWidth) / 2);
    const [posY, setPosY] = useState((window.innerHeight - (winHeight + 140)) / 2);

    const [maximized, setMaximized] = useState(false);
    const [allowTransitions, setAllowTransitions] = useState(true);

    const handleMaximize = () => {
        setAllowTransitions(true);
        if (!maximized) {
            setWinWidth(mainElm ? mainElm.clientWidth - 32 : window.innerWidth - 32);
            setWinHeight(mainElm ? mainElm.clientHeight - 22 : window.innerHeight - BOTTOM_PADDING);
            setPosX(16);
            setPosY(16);
        } else {
            setWinWidth(INIT_WIDTH);
            setWinHeight(INIT_HEIGHT);
            setPosX(mainElm ? (mainElm.clientWidth - INIT_WIDTH) / 2 : (window.innerWidth - INIT_WIDTH) / 2);
            setPosY(mainElm ? (mainElm.clientHeight - INIT_HEIGHT) / 2 : (window.innerHeight - INIT_HEIGHT) / 2);
        }
        setMaximized(!maximized);
    }

    const handleBrowserResize = () => {
        const mainElment = document.getElementById('main');
        setPosX(mainElment ? (mainElment.clientWidth - INIT_WIDTH) / 2 : (window.innerWidth - INIT_WIDTH) / 2);
        setPosY(mainElment ? (mainElment.clientHeight - INIT_HEIGHT) / 2 : (window.innerHeight - INIT_HEIGHT) / 2);
    }

    useEffect(() => {
        window.addEventListener("resize", handleBrowserResize);
        return () => { window.removeEventListener("resize", handleBrowserResize) };
    }, []);

    return (
        <Rnd
            bounds="parent"
            cancel='.actions'
            className={cn('overflow-clip flex flex-col rounded-2xl', allowTransitions && 'transition-all duration-300 ease-in-out')}
            default={{
                x: posX,
                y: posY,
                width: winWidth,
                height: winHeight,
            }}
            dragHandleClassName='nav-bar'
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
            <header onContextMenu={(uwu) => uwu.preventDefault()} onDoubleClick={handleMaximize} className='nav-bar bg-card px-4 h-8 flex justify-between items-center'>
                <h2 className='text-sm'>{title || 'Title'}</h2>
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
            <div onContextMenu={(uwu) => uwu.preventDefault()} className={cn('w-full h-full border p-12 bg-card/50 text-card-foreground backdrop-blur-3xl', className)}>
                {children}
            </div>
        </Rnd>
    );
}

export default Window;
