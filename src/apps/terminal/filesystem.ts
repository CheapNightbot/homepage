export interface FilesystemEntry {
    name: string;
    type: 'file' | 'directory';
    size: number;
    modified: Date;
    content?: string;
    children?: Record<string, FilesystemEntry>;
}

export const FILESYSTEM: Record<string, FilesystemEntry> = {
    '/': {
        name: '/',
        type: 'directory',
        size: 0,
        modified: new Date(),
        children: {
            home: {
                name: 'home/',
                type: 'directory',
                size: 0,
                modified: new Date(),
                children: {
                    user: {
                        name: 'user/',
                        type: 'directory',
                        size: 0,
                        modified: new Date(),
                        children: {
                            projects: {
                                name: 'projects/',
                                type: 'directory',
                                size: 0,
                                modified: new Date(),
                            },
                            documents: {
                                name: 'documents/',
                                type: 'directory',
                                size: 0,
                                modified: new Date(),
                            },
                            'message.txt': {
                                name: 'message.txt',
                                type: 'file',
                                size: 1024,
                                modified: new Date(),
                                content: 'yoho user-chan!\nDo you want da hug? (づ￣ ³￣)づ'
                            }
                        }
                    }
                }
            },
            bin: {
                name: 'bin/',
                type: 'directory',
                size: 0,
                modified: new Date(),
            },
            etc: {
                name: 'etc/',
                type: 'directory',
                size: 0,
                modified: new Date(),
            },
            var: {
                name: 'var/',
                type: 'directory',
                size: 0,
                modified: new Date(),
            }
        }
    }
};

// Helper function to navigate the filesystem
export function getDirectoryAtPath(path: string): FilesystemEntry | null {
    const parts = path.split('/').filter(p => p);
    let current: FilesystemEntry | undefined = FILESYSTEM['/'];

    for (const part of parts) {
        if (current?.type === 'directory' && current.children) {
            current = current.children[part];
        } else {
            return null;
        }
    }

    return current || null;
}

// Helper function to resolve paths (like .., ., etc)
export function resolvePath(currentPath: string, targetPath: string): string {
    if (targetPath.startsWith('/')) {
        // Absolute path
        return targetPath;
    } else {
        // Relative path
        const currentParts = currentPath.split('/').filter(p => p);
        const targetParts = targetPath.split('/').filter(p => p);

        for (const part of targetParts) {
            if (part === '..') {
                currentParts.pop();
            } else if (part !== '.') {
                currentParts.push(part);
            }
        }

        return '/' + currentParts.join('/');
    }
}

// Helper function to get file content at a path
export function getContentAtPath(path: string): string | "directory" | null {
    const parts = path.split('/').filter(p => p);
    let current: FilesystemEntry | undefined = FILESYSTEM['/'];

    for (const part of parts) {
        if (current?.type === 'directory' && current.children) {
            current = current.children[part];
        } else {
            return null
        }
    }

    return current?.type === 'file' ? current.content || '' : current?.type === 'directory' ? 'directory' : null;
}
