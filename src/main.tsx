import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { FileCode, RefreshCw } from "lucide-react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SOURCE_CODE } from "./constants.ts"
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden bg-[url('/src/assets/imgs/background.jpg')] animate-in fade-in zoom-in-105 scale-110 duration-1000 ease-in-out"></div>
        <App />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => location.reload()}>
          <RefreshCw />
          Refresh
        </ContextMenuItem>
        <ContextMenuItem onClick={() => window.open(SOURCE_CODE, "_blank")}>
          <FileCode />
          Source Code
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </StrictMode>
)
