import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Window from "@/components/window";
import { cn } from "@/lib/utils";
import { PlusIcon, Square, SquareCheckBig, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { Separator } from "@/components/ui/separator"
import type { AppProps } from "@/types/app";
import { v4 as uuidv4 } from 'uuid';

interface TodoItem {
    id: string;
    item: string;
    status: "done" | "pending";
}

export default function Todo({
    windowId,
    title = "Todo",
    width,
    height
}: AppProps) {
    const [todoInput, setTodoInput] = useState("");
    const [inputVisible, setInputVisible] = useState(false);
    const [todoList, setTodoList] = useState<TodoItem[]>([
        { id: "abc", item: "Complete this app!", status: "pending" },
        { id: "xyz", item: "Commit the partial changes ~", status: "done" }
    ]);
    const [hoverId, setHoverId] = useState<string | null>(null);

    const todoInputRef = useRef<HTMLInputElement>(null);

    const handleTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoInput(e.currentTarget.value);
    }

    const handleNewTodoBtnClick = () => {
        setInputVisible(!inputVisible);

        if (!inputVisible) {
            todoInputRef.current?.focus();
        } else {
            todoInputRef.current?.blur();
            setTodoInput("");
        }
    }

    const handleNewTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todoInput.length > 0) {
            setTodoList((prev) => [...prev, { id: uuidv4(), item: todoInput, status: "pending" }]);
        }
        setTodoInput("");
    }

    const toggleTodoComplete = (todoID: string) => {
        setTodoList(prev =>
            prev.map(todo =>
                todo.id === todoID
                    ? { ...todo, status: todo.status === "pending" ? "done" : "pending" }
                    : todo
            )
        );
    }

    const deleteTodo = (todoID: string) => {
        setTodoList(prev => prev.filter(todo => todo.id !== todoID));
    }

    return (
        <Window
            windowId={windowId}
            title={title}
            width={width}
            height={height}
            contentClassName="relative px-4 py-2">
            <h2 className={cn(
                "w-full left-0 absolute text-center duration-200 ease-in-out animate-[enter_.15s_ease_0s_1_normal_forwards] blur-in text-xl",
                inputVisible && "animate-[exit_.15s_ease_0s_1_normal_forwards] blur-out")}>
                Todo ☆⌒(ゝ。∂)
            </h2>
            <div className="overflow-clip mb-2">
                <form onSubmit={handleNewTodoSubmit}>
                    <Input
                        ref={todoInputRef}
                        value={todoInput}
                        onChange={(e) => handleTodoInputChange(e)}
                        className={cn("border-none focus-visible:ring-0 transition-all duration-500 ease-in-out",
                            inputVisible ? "animate-[enter_.15s_ease_0s_1_normal_forwards] slide-in-from-top" :
                                "animate-[exit_.15s_ease_0s_1_normal_forwards] slide-out-to-top"
                        )}
                        placeholder="maybe buy potatoes ?"
                    />
                </form>
            </div>
            <ScrollArea className="p-2">
                <ul className="flex flex-col gap-0.5">
                    {todoList.map((todo) => {
                        return (
                            <li
                                key={todo.id}
                                className={cn(
                                    "flex gap-2 items-center animate-in fade-in duration-300 ease-in-out transition-colors pl-2 pr-0.5 py-0.5 rounded",
                                    todo.status === "done" && "line-through text-primary",
                                    hoverId === todo.id && "text-destructive bg-accent/50"
                                )}
                            >
                                {todo.status === "done"
                                    ? <SquareCheckBig onClick={() => toggleTodoComplete(todo.id)} size={18} />
                                    : <Square onClick={() => toggleTodoComplete(todo.id)} size={18} />
                                }
                                <span className="flex-1">
                                    {todo.item}
                                </span>
                                <Trash2
                                    size={26}
                                    className="text-destructive p-1"
                                    onClick={() => deleteTodo(todo.id)}
                                    onMouseEnter={() => setHoverId(todo.id)}
                                    onMouseLeave={() => setHoverId(null)}
                                />
                            </li>
                        );
                    })}
                </ul>
            </ScrollArea>
            <Button
                onClick={handleNewTodoBtnClick}
                size="icon"
                className="rounded-full p-2 absolute bottom-0 right-0 -translate-1/2 active:scale-95"
            >
                <PlusIcon className={cn("size-full transition-all duration-300 ease-in-out", inputVisible ? "rotate-45" : "rotate-0")} />
            </Button>
            <div className="flex items-center justify-evenly max-w-[calc(100%-4rem)] gap-2 text-sm fixed w-full bottom-0 -translate-y-1/2">
                <p>Pending: {todoList.filter((todo) => todo.status === "pending").length}</p>
                <Separator orientation="vertical" className="bg-foreground/80" />
                <p>Total Todos: {todoList.length}</p>
                <Separator orientation="vertical" className="bg-foreground/80" />
                <p>Completed: {todoList.filter((todo) => todo.status === "done").length}</p>
            </div>
        </Window>
    );
}
