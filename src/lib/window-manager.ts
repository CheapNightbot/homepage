import type { AppListProps } from "@/components/app-list";

export interface WindowState {
    id: string;
    app: AppListProps;
    isMinimized: boolean;
    isMaximized: boolean;
    isClosed: boolean;
    zIndex: number;
}

export class WindowManager {
    private static instance: WindowManager;
    private windows: Map<string, WindowState> = new Map();
    private nextZIndex: number = 10; // Start from 10 to avoid conflicts with other UI elements

    private constructor() { }

    static getInstance(): WindowManager {
        if (!WindowManager.instance) {
            WindowManager.instance = new WindowManager();
        }
        return WindowManager.instance;
    }

    openWindow(app: AppListProps): WindowState {
        const windowId = `window-${app.id}`;
        const windowState: WindowState = {
            id: windowId,
            app,
            isMinimized: false,
            isMaximized: false,
            isClosed: false,
            zIndex: this.nextZIndex++ // Assign next available z-index
        };

        this.windows.set(windowId, windowState);
        return windowState;
    }

    closeWindow(windowId: string): void {
        const window = this.windows.get(windowId);
        if (window) {
            window.isClosed = true;
            this.windows.delete(windowId);
        }
    }

    minimizeWindow(windowId: string): void {
        const window = this.windows.get(windowId);
        if (window) {
            window.isMinimized = true;
        }
    }

    maximizeWindow(windowId: string): void {
        const window = this.windows.get(windowId);
        if (window) {
            window.isMaximized = true;
        }
    }

    unmaximizeWindow(windowId: string): void {
        const window = this.windows.get(windowId);
        if (window) {
            window.isMaximized = false;
        }
    }

    restoreWindow(windowId: string): void {
        const window = this.windows.get(windowId);
        if (window) {
            if (window.isMinimized) {
                window.isMinimized = false;
            }
            if (window.isMaximized) {
                window.isMaximized = false;
            }
            // Bring to front when restoring
            this.bringToFront(windowId);
        }
    }

    bringToFront(windowId: string): void {
        const window = this.windows.get(windowId);
        if (window && !window.isClosed) {
            window.zIndex = this.nextZIndex++;
        }
    }

    getHighestZIndex(): number {
        let maxZ = 0; // Start from 0
        this.windows.forEach(window => {
            if (!window.isClosed && window.zIndex > maxZ) {
                maxZ = window.zIndex;
            }
        });
        return maxZ;
    }

    // Check if window is currently focused (topmost)
    isWindowFocused(windowId: string): boolean {
        const window = this.windows.get(windowId);
        if (!window || window.isClosed) return false;

        return window.zIndex === this.getHighestZIndex();
    }

    getWindows(): WindowState[] {
        return Array.from(this.windows.values());
    }

    getWindow(windowId: string): WindowState | undefined {
        return this.windows.get(windowId);
    }

    getOpenWindows(): WindowState[] {
        return Array.from(this.windows.values()).filter(w => !w.isClosed);
    }

    getMaximizedWindows(): WindowState[] {
        return Array.from(this.windows.values()).filter(w => w.isMaximized && !w.isClosed);
    }
}
