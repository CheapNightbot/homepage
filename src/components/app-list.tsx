import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";

function AppIcon({ id, icon, name }: { id: number; icon?: string; name: string; }) {
  return (
    <Button
      key={id}
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
  let idx = projects.length;

  return (
    <section className="mb-4">
      <div className="grid grid-cols-5 gap-5">
        {projects.map((project) => {
          return (
            <AppIcon id={project.id} icon={project.image} name={project.name} />
          );
        })}
        <AppIcon id={idx++} name="Blog" />
        <AppIcon id={idx++} name="Journal" />
        <AppIcon id={idx++} name="Contact" />
      </div>
    </section>
  );
}

export { AppList }
