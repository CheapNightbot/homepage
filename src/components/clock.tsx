import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface TimezoneClockProps {
    timeZone?: string;
    showSeconds?: boolean;
    showTimezone?: boolean;
    allowHourToggle?: boolean;
    locale?: string;
    className?: string;
    timeClassName?: string;
}

export default function Clock({
    timeZone = "Asia/Tokyo",
    showSeconds = true,
    showTimezone = true,
    allowHourToggle = true,
    locale = "en-US",
    className = "",
    timeClassName = "",
}: TimezoneClockProps) {
    const [now, setNow] = useState<Date>(new Date());
    const [is12Hour, setIs12Hour] = useState(true);

    function toggle12Hour() { allowHourToggle && setIs12Hour((prev) => !prev) }

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: is12Hour,
    };

    if (showSeconds) {
        options.second = "2-digit";
    }

    const formatted = now.toLocaleString(locale, options);

    return (
        <div className={`flex flex-col items-center space-y-2 select-none ${className}`}>
            {
                showTimezone
                &&
                <div className="text-sm text-muted-foreground">Timezone: {timeZone}</div>
            }
            <div onClick={toggle12Hour} role="timer" aria-live="polite" className={cn("text-xl font-medium", timeClassName)}>
                {formatted}
            </div>
        </div>
    );
}
