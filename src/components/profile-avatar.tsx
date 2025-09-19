import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CheapNightbot from "../assets/imgs/Cheap Nightbot.svg";
import { useState } from "react";
import { VenusMarsFlip } from "./VenusMarsFlip";

function ProfileAvatar() {
    const [showIcon, setShowIcon] = useState(false);

    return (
        <Avatar onClick={() => setShowIcon(!showIcon)} className="select-none size-26 transition-all duration-300 ease-in-out active:scale-95">
            {
                showIcon ?
                    <div className="bg-gradient-to-b from-[#55CDFC] via-[#FFFFFF] to-[#F7A8B8] flex size-full items-center justify-center rounded-full animate-in blur-in-md duration-200">
                        <VenusMarsFlip size={50} />
                    </div>
                    : <AvatarImage src={CheapNightbot} alt="Cheap Nightbot" />
            }
            <AvatarFallback className="text-lg">/ᐠ - ˕ -マ</AvatarFallback>
        </Avatar>
    );
}

export default ProfileAvatar;
