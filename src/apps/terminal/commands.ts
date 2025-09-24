import { getContentAtPath, getDirectoryAtPath, resolvePath } from "./filesystem";

interface CommandHandler {
    name: string;
    execute: (args: string[], env: Record<string, string>) => string | string[] | null;
}

// Utility function to parse args from commands ~
export function parseArgs(args: string[]): string {
    const fullArgs = args.join(' ');
    const matches = fullArgs.match(/"([^"]*)"|'([^']*)'|(\S+)/g);
    if (matches) {
        return matches.map(match => {
            const trimmed = match.trim();
            if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
                (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
                return trimmed.slice(1, -1); // Remove quotes
            }
            return trimmed;
        }).join(' ');
    }
    return fullArgs;
}

// `alert` command
const handleAlert = (args: string[]): null => {
    alert(parseArgs(args));
    return null;
}

// `cat` command
// -- ᓚ₍⑅^..^₎♡ 貓
const handleCat = (args: string[], env: Record<string, string>) => {
    if (args.length === 0) {
        return '/ᐠ ¬`‸´¬ マ cat: missing file operand';
    }

    let fileName = args[0];
    if (fileName.startsWith("~")) fileName = `${env.HOME}/${fileName.slice(1)}`;

    const filePath = resolvePath(env.PWD, fileName);
    const content = getContentAtPath(filePath);

    if (content === null) {
        return `/ᐠﹷ ‸ ﹷ ᐟ\ﾉ cat: ${fileName}: No such file or directory`;
    } else if (content === 'directory') {
        return `/ᐠﹷ ‸ ﹷ ᐟ\ﾉ cat: ${fileName}: Is a directory`;
    }

    return content.split('\n');
}

// `cd` command
const handleCd = (args: string[], env: Record<string, string>): string => {
    const target = args[0] || '~'; // Default to home if no argument

    let newPath: string;
    if (target === '~') {
        newPath = env.HOME;
    } else if (target === '..') {
        const currentParts = env.PWD.split('/').filter(p => p);
        currentParts.pop();
        newPath = '/' + currentParts.join('/');
    } else {
        newPath = resolvePath(env.PWD, target);
    }

    const dir = getDirectoryAtPath(newPath);
    if (!dir || dir.type !== 'directory') {
        throw new Error(`cd: cannot access '${target}': No such directory`);
    }

    return newPath;
};

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
const handleEcho = (args: string[], env: Record<string, string>): string => {
    const parsedArgs = parseArgs(args)
    if (parsedArgs === "$SHELL" || parsedArgs === "$0") {
        return env.SHELL;
    }

    return parsedArgs;
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
const handleLs = (args: string[], env: Record<string, string>) => {
    let path = env.PWD;

    // If there's an argument, use that as the path
    if (args.length > 0 && !args.includes('-l')) {
        let target = args[0];
        if (target.startsWith("~")) target = `${env.HOME}/${target.slice(1)}`;
        path = resolvePath(env.PWD, target);
    }

    const entry = getDirectoryAtPath(path);

    if (!entry || entry.type !== 'directory') {
        return `ls: cannot access '${path}': No such file or directory`;
    }

    if (args.includes('-l')) {
        if (!entry.children) {
            return [`⤷ total 0`];
        }

        const files = Object.values(entry.children).map(child => {
            const perms = child.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--';
            const size = child.size;
            const date = child.modified.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
            return `${perms} 1 ${env.USER} ${env.USER} ${size}KiB ${date} ${child.name}`;
        });

        const total = entry.children ? Object.keys(entry.children).length : 0;
        return [...files, `⤷ total ${total}`];
    } else {
        if (!entry.children) {
            return '';
        }
        return Object.values(entry.children).map(child => child.name).join(' ');
    }
};

// `pwd` command
const handlePwd = (env: Record<string, string>): string => {
    return env.PWD;
}

// `whoami` command
const handleWhoami = (env: Record<string, string>): string => {
    return env.USER;
}


// --- Special case commands ----
// `clear` command
const handleClear = (): null => {
    return null;
}

// `history` command
const handleHistory = (): null => {
    return null;
}
// ------------------------------

export const getCommandList = (allCommands: string[]): CommandHandler[] => [
    { name: "alert", execute: (args) => handleAlert(args) },
    { name: "cat", execute: (args, env) => handleCat(args, env) },
    { name: "cd", execute: (args, env) => handleCd(args, env) },
    { name: "clear", execute: handleClear },
    { name: "date", execute: () => handleDate() },
    { name: "echo", execute: (args, env) => handleEcho(args, env) },
    { name: "env", execute: (_, env) => handleEnv(env) },
    { name: "help", execute: () => handleHelp(allCommands) },
    { name: "history", execute: handleHistory },
    { name: "ls", execute: (args, env) => handleLs(args, env) },
    { name: "pwd", execute: (_, env) => handlePwd(env) },
    { name: "whoami", execute: (_, env) => handleWhoami(env) },
];

export const COMMAND_NAMES = [
    "alert",
    "cat",
    "cd",
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
