import { Github } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import Window from "@/components/window";
import type { AppProps } from "@/types/app";
import { ExternalLink } from "lucide-react";
import type { ProjectsList } from "./projects";
import { projects } from "./projects";

export default function Projects({
  windowId,
  title = "Projects",
  width = 800,
  height = 600,
  className = "",
}: AppProps) {

  return (
    <Window
      windowId={windowId}
      title={title}
      width={width}
      height={height}
      className={className}
      contentClassName="flex flex-col items-center gap-6 px-12 py-6"
    >
      <div className="flex flex-col items-center">
        <p>not all projects are listed here ~
          see my <span
            className="text-accent-foreground underline link"
            onClick={() => window.open("https://github.com/CheapNightbot?tab=repositories", "_blank")}
          >
            GitHub
          </span> profile for a list of all (excluding private) projects !</p>
      </div>
      <ScrollArea scrollbarVisible={false} className="overflow-scroll">
        <ItemGroup className="gap-4">
          {projects.map((project: ProjectsList) => (
            <Item key={project.id} variant="outline" asChild role="listitem" className="bg-secondary/40 text-secondary-foreground rounded-lg">
              <div>
                <ItemMedia variant="image" className="pointer-events-none select-none">
                  <Avatar className="rounded-md">
                    <AvatarImage src={project.image} alt={project.name} />
                    <AvatarFallback className="rounded-md animate-pulse"><Skeleton /></AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="line-clamp-1 font-semibold text-lg">
                    {project.name}
                  </ItemTitle>
                  <ItemDescription className="text-foreground">
                    {project.description}
                  </ItemDescription>
                  <ItemFooter className="justify-start select-none py-0.5">
                    {project.techStack.map(name => (
                      <p className="rounded px-2 bg-accent text-accent-foreground shadow hover:shadow-xl transition-all duration-200 ease-in-out" key={name}>
                        {name}
                      </p>
                    ))}
                  </ItemFooter>
                </ItemContent>
                <ItemContent className="gap-2">
                  <ExternalLink className="hover:scale-105 active:scale-90 transition-all duration-200 ease-in-out" onClick={() => window.open(project.live, "_blank")} />
                  <Github className="hover:scale-105 active:scale-90 transition-all duration-200 ease-in-out" onClick={() => window.open(project.github, "_blank")} />
                </ItemContent>
              </div>
            </Item>
          ))}
        </ItemGroup>
      </ScrollArea>
    </Window>
  );
}
