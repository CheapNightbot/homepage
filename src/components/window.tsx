import { Circle, Minus, Plus, X } from 'lucide-react';
import { Rnd } from 'react-rnd';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

function Window({ title, children, className }) {
    const [winWidth, setWinWidth] = useState(480);
    const [winHeight, setWinHeight] = useState(540);
    const [posX, setPosX] = useState((window.innerWidth - winWidth) / 2);
    const [posY, setPosY] = useState((window.innerHeight - winHeight) / 2);

    const [maximized, setMaximized] = useState(false);
    const [allowTransitions, setAllowTransitions] = useState(true);

    const handleMaximize = () => {
        if (!maximized) {
            setWinWidth(window.innerWidth);
            setWinHeight(window.innerHeight - 32); // 32px - the height of top bar !
            setPosX(0);
            setPosY(0);
        } else {
            setWinWidth(480);
            setWinHeight(540);
            setPosX((window.innerWidth - 480) / 2);
            setPosY((window.innerHeight - 540) / 2);
        }
        setMaximized(!maximized);
    }

    // Resize handling for the browser window itself, not the Rnd window !
    const handleResize = () => {
        setPosX((window.innerWidth - winWidth) / 2);
        setPosY((window.innerHeight - winHeight) / 2);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Rnd
            bounds="parent"
            cancel='.actions'
            className={cn('overflow-clip flex flex-col', maximized ? 'z-100' : 'rounded-2xl', allowTransitions && 'transition-all duration-300 ease-in-out')}
            default={{
                x: posX,
                y: posY,
                width: winWidth,
                height: winHeight,
            }}
            dragHandleClassName='nav-bar'
            onResizeStart={() => setAllowTransitions(false)}
            onResizeStop={(_, __, ___, delta, ____) => {
                setWinWidth((prev) => prev + delta.width);
                setWinHeight((prev) => prev + delta.height);
                setAllowTransitions(true);
            }}
            onDragStart={() => setAllowTransitions(false)}
            onDragStop={(_, data) => {
                setPosX(data.x);
                setPosY(data.y);
                setAllowTransitions(true);
            }}
            minWidth={460}
            minHeight={540}
            position={{ x: posX, y: posY }}
            size={{ width: winWidth, height: winHeight }}
        >
            <header onDoubleClick={handleMaximize} className='nav-bar bg-card px-4 h-8 flex justify-between items-center'>
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
            <div className={cn('w-full h-full border p-12 bg-card/50 text-card-foreground backdrop-blur-3xl', className)}>
                {children}
            </div>
        </Rnd>
    );
}

export default Window;
