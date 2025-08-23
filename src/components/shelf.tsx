import CheapNightbot from "@/assets/imgs/Cheap Nightbot.svg"
import { AppList } from "@/components/app-list"
import Clock from "@/components/clock"
import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
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
import { useEffect, useState } from "react"
import type { AppListProps } from "./app-list"

export default function Shelf({ appList }: { appList: AppListProps[] }) {
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [isDatetimeOpen, setIsDatetimeOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const toggleAppLauncher = () => setIsLauncherOpen((prev) => !prev);
  const toggleDatetimeMenu = () => setIsDatetimeOpen((prev) => !prev);

  const formatMonthDay = (d?: Date) => {
    if (!d) return '';

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(d);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "a" && (e.ctrlKey)) {
        e.preventDefault()
        setIsLauncherOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    // Shelf
    <div className="z-[999] flex items-center justify-between px-4 fixed bottom-0 w-full h-16 bg-background/50 shadow backdrop-blur-xl border-t border-x rounded-t-4xl">
      {/*  Launcher */}
      <Sheet open={isLauncherOpen} modal={false} onOpenChange={toggleAppLauncher}>
        <SheetTrigger>
          {/*  Launcher Button */}
          <Button asChild={true} className="rounded-full p-6" variant="ghost">
            <span>
              <Circle className="size-6" /><CircleSmall className={cn("absolute fade-in-15 transition-all duration-200 ease-in-out", isLauncherOpen && "fill-primary")} />
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent showClose={false} showOverlay={false} side="bottom" className="bg-background/50 shadow backdrop-blur-xl border w-xl h-[672px] fixed bottom-20 left-2 rounded-3xl flex flex-col justify-between px-1 pt-2 pb-4 focus:outline-none">
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
            <AppList appList={appList} />
          </ScrollArea>

          {/* User Profile and Theme Toggle Button */}
          <SheetFooter className="flex justify-between px-4">
            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center gap-2 select-none">
                  <Avatar>
                    <AvatarImage src={CheapNightbot} alt="Cheap Nightbot" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-sm">Cheap Nightbot</p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent align="start" sideOffset={12} className="w-80">
                <div className="flex justify-between items-center gap-4">
                  <Avatar className="size-14">
                    <AvatarImage src={CheapNightbot} alt="Cheap Nightbot" className="select-none pointer-events-none" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="font-semibold">Cheap Nightbot</h4>
                    <p className="text-xs">
                      yohoi, me a boiled potato ~ Do you want da hug? (づ￣ ³￣)づ
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <ModeToggle />
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Date-time and other stuff in the shelf ~ right side */}
      <Sheet modal={false} onOpenChange={toggleDatetimeMenu}>
        <SheetTrigger>
          {/* Datetime menu open button */}
          <Button asChild={true} className={cn("rounded-full p-4", isDatetimeOpen && "bg-accent")} variant="ghost">
            <span className="">
              <p>{formatMonthDay(date)},</p>
              <Clock showTimezone={false} showSeconds={false} allowHourToggle={false} timeClassName="text-sm" />
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent showClose={false} showOverlay={false} side="bottom" className="border-none shadow-none w-2xs h-[484px] fixed bottom-20 left-auto right-2 rounded-3xl flex flex-col justify-end items-center gap-0 -z-10 focus:outline-none">
          <SheetHeader>
            <SheetTitle className="flex gap-2 relative mt-1">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border shadow-lg"
              />
            </SheetTitle>
            <SheetDescription className="sr-only">Calender and Time</SheetDescription>
          </SheetHeader>
          <SheetFooter className="flex justify-between px-4">
            <Clock className="border w-[250px] py-2 rounded-lg shadow-lg bg-background" />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
