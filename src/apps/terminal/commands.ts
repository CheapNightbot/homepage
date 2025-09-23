interface CommandHandler {
    name: string;
    execute: (args: string[], env: Record<string, string>) => string | string[] | null;
}

function parseArgs(args: string[]): string {
    const fullArgs = args.join(' ');
    const match = fullArgs.match(/"([^"]*)"|'([^']*)'|(\S+)/);
    const text = match?.[1] || match?.[2] || match?.[3] || '';
    return text;
}

// `alert` command
const handleAlert = (args: string[]): null => {
    alert(parseArgs(args));
    return null;
}

// `date` command
const handleDate = (): string => {
    return Intl.DateTimeFormat("en-US",
        {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }
    ).format(new Date());
}

// `echo` command
const handleEcho = (args: string[]): string => {
    return parseArgs(args);
}

// `env` command
const handleEnv = (env: Record<string, string>) => {
    return Object.entries(env).map(([key, value]) => `${key}=${value}`);
}

// `help` command
const handleHelp = (allCommands: string[]): string => {
    return `Available commands: ${allCommands.join(', ')}`;
}

// `ls` command
const handleLs = (args: string[]) => {
    if (args.includes('-l')) {
        return [
            "total 3",
            "-rw-r--r-- 1 user user 1024 Jan 1 12:00 file1.txt",
            "-rw-r--r-- 1 user user 2048 Jan 2 13:00 file2.js",
            "drwxr-xr-x 2 user user 4096 Jan 3 14:00 folder/"
        ];
    } else {
        return "file1.txt  file2.js  folder/";
    }
}

// `pwd` command
const handlePwd = (env: Record<string, string>): string => {
    return env.PWD;
}

// `whoami` command
const handleWhoami = (env: Record<string, string>): string => {
    return env.USER;
}

// `clear` command - special case, returns null
const handleClear = (): null => {
    return null;
}

// `history` command - for now, return null
// but later can accept options maybe ?
// like `-c` to delete command history ~
const handleHistory = (): null => {
    return null;
}

export const getCommandList = (allCommands: string[]): CommandHandler[] => [
    { name: "alert", execute: (args) => handleAlert(args) },
    { name: "clear", execute: handleClear },
    { name: "date", execute: () => handleDate() },
    { name: "echo", execute: (args) => handleEcho(args) },
    { name: "env", execute: (_, env) => handleEnv(env) },
    { name: "help", execute: () => handleHelp(allCommands) },
    { name: "history", execute: handleHistory },
    { name: "ls", execute: (args) => handleLs(args) },
    { name: "pwd", execute: (_, env) => handlePwd(env) },
    { name: "whoami", execute: (_, env) => handleWhoami(env) },
];

export const COMMAND_NAMES = [
    "alert",
    "clear",
    "date",
    "echo",
    "env",
    "help",
    "history",
    "ls",
    "pwd",
    "whoami"
];
