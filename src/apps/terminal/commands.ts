export interface CommandHandler {
    name: string;
    execute: (args: string[], env: Record<string, string>) => string | string[] | null;
}

// `echo` command
export const handleEcho = (args: string[]): string => {
    const fullArgs = args.join(' ');
    const match = fullArgs.match(/"([^"]*)"|'([^']*)'|(\S+)/);
    const text = match?.[1] || match?.[2] || match?.[3] || '';
    return text;
}

// `date` command
export const handleDate = (): string => {
    return Intl.DateTimeFormat("en-US",
        {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }
    ).format(new Date());
}

// `env` command
export const handleEnv = (env: Record<string, string>) => {
    return Object.entries(env).map(([key, value]) => `${key}=${value}`);
}

// `help` command
export const handleHelp = (allCommands: string[]): string => {
    return `Available commands: ${allCommands.join(', ')}`;
}

// `ls` command
export const handleLs = (args: string[]) => {
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
export const handlePwd = (env: Record<string, string>): string => {
    return env.PWD;
}

// `whoami` command
export const handleWhoami = (): string => {
    return "potato";
}

// `clear` command - special case, returns null
export const handleClear = (): null => {
    return null;
}

export const getCommandList = (allCommands: string[]): CommandHandler[] => [
    { name: "clear", execute: handleClear },
    { name: "echo", execute: (args) => handleEcho(args) },
    { name: "date", execute: () => handleDate() },
    { name: "env", execute: (_, env) => handleEnv(env) },
    { name: "help", execute: () => handleHelp(allCommands) },
    { name: "ls", execute: (args) => handleLs(args) },
    { name: "pwd", execute: (_, env) => handlePwd(env) },
    { name: "whoami", execute: () => handleWhoami() },
];

export const COMMAND_NAMES = [
    "clear",
    "echo",
    "date",
    "env",
    "help",
    "ls",
    "pwd",
    "whoami"
];
