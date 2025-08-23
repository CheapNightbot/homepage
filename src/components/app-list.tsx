import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { apps } from "@/lib/apps";
import { projects } from "@/lib/projects";

function AppIcon({ icon, name }: { icon?: string; name: string; }) {
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

function AppList() {
  const appList = [...projects, ...apps]

  return (
    <section className="mb-4">
      <div className="grid grid-cols-5 gap-5">
        {appList.map((app) => {
          return (
            <AppIcon key={app.id} icon={app.image} name={app.name} />
          );
        })}
      </div>
    </section>
  );
}

export { AppList }
