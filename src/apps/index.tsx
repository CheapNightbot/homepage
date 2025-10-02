import About from "@/apps/about";
import Blog from "@/apps/blog";
import Journal from "@/apps/journal";
import Terminal from "@/apps/terminal";
import Todo from "@/apps/todo";

export const AppList: Record<string, React.ComponentType<any>> = {
    'About': About,
    'Blog': Blog,
    'Journal': Journal,
    'Terminal': Terminal,
    'Todo': Todo,
}
