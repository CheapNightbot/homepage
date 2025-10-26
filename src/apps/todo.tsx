import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Window from "@/components/window";
import { cn } from "@/lib/utils";
import type { AppProps } from "@/types/app";
import { BadgeInfo, Plus, PlusIcon, Square, SquareCheckBig, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
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
    const [todoList, setTodoList] = useState<TodoItem[]>(() => {
        const todoDB = localStorage.getItem('todoDB');
        return todoDB ? JSON.parse(todoDB) : [];
    });
    // const uniqueCreationDates = todoList.

    const [hoverId, setHoverId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const todoInputRef = useRef<HTMLInputElement>(null);
    const originalContentRef = useRef<string>("");

    useEffect(() => {
        localStorage.setItem('todoDB', JSON.stringify(todoList));
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
        } else {
            toast.error("Todo item can not be empty!");
            return;
        }
        setInputVisible(!inputVisible);
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
        setDeletingId(todoID);
        setTimeout(() => {
            setTodoList(prev => prev.filter(todo => todo.id !== todoID));
            if (deletingId === todoID) {
                setDeletingId(null);
            }
        }, 300);
    };

    const startEditing = (todo: TodoItem, el: HTMLElement) => {
        setEditingId(todo.id);
        originalContentRef.current = todo.content;
        el.contentEditable = "true";
        el.focus();
    };

    const commitEdit = (todoID: string, el: HTMLElement) => {
        const newContent = el.innerText.trim();

        // Validate new content
        if (newContent.length === 0) {
            // Empty, restore the original value
            el.innerText = originalContentRef.current;
        } else if (newContent !== originalContentRef.current) {
            setTodoList(prev =>
                prev.map(todo =>
                    todo.id === todoID
                        ? { ...todo, content: newContent }
                        : todo
                )
            );
        }

        el.contentEditable = "false";
        setEditingId(null);
    }

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
                                        todo.status === "done" && editingId !== todo.id ? "line-through text-primary" : "",
                                        hoverId === todo.id && "text-destructive bg-accent/50",
                                        deletingId === todo.id && "animate-out slide-out-to-left ease-out duration-300"
                                    )}
                                >
                                    {todo.status === "done"
                                        ? <SquareCheckBig onClick={() => toggleTodoComplete(todo.id)} size={18} />
                                        : <Square onClick={() => toggleTodoComplete(todo.id)} size={18} />
                                    }
                                    <span
                                        role="textbox"
                                        aria-multiline="false"
                                        className="flex-1"
                                        onDoubleClick={(e) => startEditing(todo, e.currentTarget)}
                                        onBlur={(e) => {
                                            if (editingId === todo.id) {
                                                commitEdit(todo.id, e.currentTarget);
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                commitEdit(todo.id, e.currentTarget);
                                            }
                                        }}
                                        suppressContentEditableWarning={true}
                                    >
                                        {todo.content}
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
            {todoList.length > 0
                &&
                <small className="inline-flex px-2 items-center justify-center gap-1 text-card-foreground animate-in blur-in duration-500">
                    <BadgeInfo size={16} /> You can double click on a todo to edit it!
                </small>
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
