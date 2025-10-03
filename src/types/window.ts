export interface WindowState {
    id: string;
    type: string; // e.g., "Terminal", "Todo", "About"
    title?: string;
    minimized: boolean;
    maximized: boolean;
    focused: boolean;
    width?: number;
    height?: number;
    // Add other window properties as needed
}

export interface WindowManagerContextType {
    windows: WindowState[];
    openWindow: (type: string, title?: string, width?: number, height?: number) => string;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    restoreWindow: (id: string) => void;
    isWindowOpen: (type: string) => boolean;
}
