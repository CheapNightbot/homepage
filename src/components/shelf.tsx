import CheapNightbot from "@/assets/imgs/Cheap Nightbot.svg"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Circle, CircleSmall, Search } from "lucide-react"
import { useState } from "react"
import { AppList } from "@/components/app-list"


export default function Shelf() {
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [isDatetimeOpen, setIsDatetimeOpen] = useState(false);

  const toggleAppLauncher = () => setIsLauncherOpen(!isLauncherOpen);
  const toggleDatetimeMenu = () => setIsDatetimeOpen(!isDatetimeOpen);

  return (
    // Shelf
    <div className="flex items-center justify-between px-4 fixed bottom-0 w-full h-16 bg-background border-t border-x rounded-t-4xl">
      {/*  Launcher */}
      <Sheet modal={false} onOpenChange={toggleAppLauncher}>
        <SheetTrigger>
          {/*  Launcher Button */}
          <Button asChild={true} className="rounded-full p-6" variant="ghost">
            <span>
              <Circle className="size-6" /><CircleSmall className={cn("absolute fade-in-15 transition-all duration-200 ease-in-out", isLauncherOpen && "fill-primary")} />
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent showClose={false} showOverlay={false} side="bottom" className="border w-xl h-[672px] fixed bottom-20 left-2 rounded-3xl flex flex-col justify-between px-1 pt-2 pb-4 -z-10 focus:outline-none">
          {/* Hidden element to prevent auto-focus on the Input */}
          <span tabIndex={0} className="sr-only">Prevent auto focus</span>
          <SheetHeader>
            {/* Search Bar */}
            <SheetTitle className="flex gap-2 relative mt-1">
              <span className="sr-only">Search</span>
              <Search className="size-4 absolute left-0 top-0 translate-x-2.5 translate-y-2.5" />
              <Input id="search" placeholder="Searching for apps & projects..." className="pl-8 focus-visible:ring-0" />
            </SheetTitle>
            <SheetDescription className="sr-only">List of all projects & apps.</SheetDescription>
          </SheetHeader>

          {/* App List // Search Result Container */}
          <ScrollArea scrollbarVisible={false} className="flex-1 flex-wrap h-full mx-6 my-4">
            <AppList />
          </ScrollArea>

          {/* User Profile and Theme Toggle Button */}
          <SheetFooter className="flex justify-between px-4">
            <div className="flex items-center gap-2 select-none">
              <Avatar>
                <AvatarImage src={CheapNightbot} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm">Cheap Nightbot</p>
            </div>
            <ModeToggle />
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Date-time and other stuff in the shelf ~ right side */}
      <Sheet modal={false} onOpenChange={toggleDatetimeMenu}>
        <SheetTrigger>
          {/* Datetime menu open button */}
          <Button asChild={true} className={cn("rounded-full p-4", isDatetimeOpen && "bg-accent")} variant="ghost">
            <span>
              Date & Time
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent showClose={false} showOverlay={false} side="bottom" className="border w-2xs h-96 fixed bottom-20 left-auto right-2 rounded-3xl flex flex-col justify-between px-1 pt-2 pb-4 -z-10 focus:outline-none">
          <SheetHeader>
            <SheetTitle className="flex gap-2 relative mt-1">
              Date & Time
            </SheetTitle>
            <SheetDescription>This will show date & time here...</SheetDescription>
          </SheetHeader>
          <SheetFooter className="flex justify-between px-4">
            Time will be here !
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
