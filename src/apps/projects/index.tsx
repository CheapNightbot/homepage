import { Github } from "@/components/icons";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import Window from "@/components/window";
import type { AppProps } from "@/types/app";
import { ExternalLink } from "lucide-react";
import type { ProjectsList } from "./projects";
import { projects } from "./projects";

export default function Projects({
  windowId,
  title = "Projects",
  width = 800,
  height,
  className = "",
}: AppProps) {

  return (
    <Window
      windowId={windowId}
      title={title}
      width={width}
      height={height}
      className={className}
      contentClassName="flex flex-col items-center gap-4 p-12"
    >
      <ItemGroup className="gap-4">
        {projects.map((project: ProjectsList) => (
          <Item key={project.id} variant="outline" asChild role="listitem" className="bg-secondary/40 text-secondary-foreground rounded-lg">
            <div>
              <ItemMedia variant="image" className="pointer-events-none select-none">
                <img
                  src={project.image}
                  alt={project.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1 font-semibold text-lg">
                  {project.name}
                </ItemTitle>
                <ItemDescription className="text-foreground">
                  {project.description}
                </ItemDescription>
                <ItemFooter className="justify-start select-none">
                  {project.techStack.map(name => (
                    <p className="rounded px-2 bg-accent text-accent-foreground shadow">
                      {name}
                    </p>
                  ))}
                </ItemFooter>
              </ItemContent>
              <ItemContent className="gap-2">
                <ExternalLink className="active:scale-90" onClick={() => window.open(project.live, "_blank")} />
                <Github className="active:scale-90" onClick={() => window.open(project.github, "_blank")} />
              </ItemContent>
            </div>
          </Item>
        ))}
      </ItemGroup>
    </Window>
  );
}
