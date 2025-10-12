import About from "@/apps/about";
import Blog from "@/apps/blog";
import Journal from "@/apps/journal";
import Projects from "@/apps/projects";
import Terminal from "@/apps/terminal";
import Todo from "@/apps/todo";
import Wallpepper from "@/apps/wallpepper";
import Contact from "@/apps/contact";

export const AppList: Record<string, React.ComponentType<any>> = {
    'About': About,
    'Blog': Blog,
    'Contact': Contact,
    'Journal': Journal,
    'Projects': Projects,
    'Terminal': Terminal,
    'Todo': Todo,
    'Wallpepper': Wallpepper,
}
