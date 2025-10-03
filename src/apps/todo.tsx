import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Window from "@/components/window";
import { cn } from "@/lib/utils";
import type { AppProps } from "@/types/app";
import { Plus, PlusIcon, Square, SquareCheckBig, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface TodoItem {
    id: string;
    content: string;
    createdOn: Date;
    status: "done" | "pending";
}

export default function Todo({
    windowId,
    title = "Todo",
    width,
    height,
    className = ""
}: AppProps) {
    const [todoInput, setTodoInput] = useState("");
    const [inputVisible, setInputVisible] = useState(false);
    const [todoList, setTodoList] = useState<TodoItem[]>([]);
    // const uniqueCreationDates = todoList.

    const [hoverId, setHoverId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const todoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const todoDB = localStorage.getItem('todoDB');
        if (todoDB) setTodoList(JSON.parse(todoDB));
    }, []);

    useEffect(() => {
        if (todoList) {
            localStorage.setItem('todoDB', JSON.stringify(todoList));
        }
    }, [todoList]);

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
            setTodoList((prev) => [
                {
                    id: uuidv4(),
                    content: todoInput,
                    createdOn: new Date(),
                    status: "pending"
                },
                ...prev,
            ]);
        }
        setInputVisible(!inputVisible);
        setTodoInput("");
    }

    const handleUpdateTodo = (todoID: string) => {
        setTodoList(prev =>
            prev.map(todo =>
                todo.id === todoID
                    ? { ...todo, content: editText }
                    : todo
            )
        );
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
        setDeletingId(todoID);
        setTimeout(() => {
            setTodoList(prev => prev.filter(todo => todo.id !== todoID));
            if (deletingId === todoID) {
                setDeletingId(null);
            }
        }, 300);
    };

    return (
        <Window
            windowId={windowId}
            title={title}
            width={width}
            height={height}
            className={className}
            contentClassName="relative px-4 py-2 flex flex-col">
            <h2 className={cn(
                "font-bold w-full left-0 absolute text-center duration-200 ease-in-out animate-[enter_.15s_ease_0s_1_normal_forwards] blur-in text-xl",
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
            {todoList.length > 0 ?
                <ScrollArea scrollbarVisible={false} className="p-2 flex-1 max-h-[calc(100%-6rem)]">
                    <ul className="flex flex-col gap-0.5">
                        {todoList.map((todo) => {
                            return (
                                <li
                                    key={todo.id}
                                    className={cn(
                                        "flex gap-2 items-center animate-in fade-in zoom-in-95 duration-300 ease-in-out transition-colors pl-2 pr-0.5 py-0.5 rounded",
                                        todo.status === "done" && "line-through text-primary",
                                        hoverId === todo.id && "text-destructive bg-accent/50",
                                        deletingId === todo.id && "animate-out slide-out-to-left ease-out duration-300"
                                    )}
                                >
                                    {todo.status === "done"
                                        ? <SquareCheckBig onClick={() => toggleTodoComplete(todo.id)} size={18} />
                                        : <Square onClick={() => toggleTodoComplete(todo.id)} size={18} />
                                    }
                                    <span
                                        onBlur={(e) => {
                                            const target = e.currentTarget;
                                            setEditingId(null);
                                            handleUpdateTodo(todo.id)
                                            target.contentEditable = "false";
                                        }}
                                        onDoubleClick={(e) => {
                                            const target = e.currentTarget;
                                            setEditingId(todo.id);
                                            setEditText(todo.content);
                                            target.contentEditable = "true";
                                            target.focus();
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                const target = e.currentTarget;
                                                setEditingId(null);
                                                handleUpdateTodo(todo.id)
                                                target.contentEditable = "false";
                                            }
                                        }}
                                        className="flex-1"
                                        suppressContentEditableWarning={true}
                                    >
                                        {editingId === todo.id ? editText : todo.content}
                                    </span>
                                    <Trash2
                                        size={26}
                                        className="text-destructive p-1 active:scale-90"
                                        onClick={() => deleteTodo(todo.id)}
                                        onMouseEnter={() => setHoverId(todo.id)}
                                        onMouseLeave={() => setHoverId(null)}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </ScrollArea>
                :
                <div className="animate-in fade-in duration-300 ease-in-out gap-2 p-2 flex-1 max-h-[calc(100%-8rem)] flex flex-col items-center justify-center">
                    <h2 className="font-semibold text-2xl">Not even a potato ??</h2>
                    <p className="inline-flex items-center gap-1.5">
                        Click on
                        <Plus size={18} className="bg-primary text-primary-foreground shadow-xs rounded-full p-px" />
                        icon below to add something ~
                    </p>
                </div>
            }
            <Button
                onClick={handleNewTodoBtnClick}
                size="icon"
                className="rounded-full p-2 absolute bottom-0 right-0 -translate-1/2 active:scale-95 z-2"
            >
                <PlusIcon className={cn("size-full transition-all duration-300 ease-in-out", inputVisible ? "rotate-45" : "rotate-0")} />
            </Button>
            <div className="flex items-center justify-evenly gap-2 text-sm fixed w-full left-0 bottom-0 py-2 bg-accent/20 backdrop-blur z-1 px-10">
                <p>Pending: {todoList.filter((todo) => todo.status === "pending").length}</p>
                <Separator orientation="vertical" className="bg-foreground/80" />
                <p>Total Todos: {todoList.length}</p>
                <Separator orientation="vertical" className="bg-foreground/80" />
                <p>Completed: {todoList.filter((todo) => todo.status === "done").length}</p>
            </div>
        </Window>
    );
}
