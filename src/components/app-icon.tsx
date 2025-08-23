import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type AppIconProps = {
  icon?: string;
  name: string;
};

export default function AppIcon({ icon, name }: AppIconProps) {
  return (
    <Button
      className="size-18 flex flex-col gap-0 pb-4 hover:!bg-transparent items-center justify-center text-primary/70 hover:text-primary"
      variant="ghost"
    >
      <Avatar className="size-14 p-1.5">
        <AvatarImage src={icon} />
        <AvatarFallback className="text-2xl">{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="text-xs text-center">{name}</span>
    </Button>
  );
}
