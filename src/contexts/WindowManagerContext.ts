import { type WindowManagerContextType } from "@/types/window";
import { createContext, useContext } from "react";

export const WMContext = createContext<WindowManagerContextType | undefined>(undefined);

export const useWMContext = () => {
    const context = useContext(WMContext);
    if (!context) {
        throw new Error('useWMContext must be used within a WMProvider!');
    }
    return context;
};