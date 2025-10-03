import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { FileCode, RefreshCw, Image } from "lucide-react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SOURCE_CODE } from "./constants.ts"
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextMenu>
      <ContextMenuTrigger>
        <App />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => location.reload()}>
          <RefreshCw />
          Refresh
        </ContextMenuItem>
        <ContextMenuItem onClick={() => alert('not implemented yet ~')}>
          <Image />
          Background
        </ContextMenuItem>
        <ContextMenuItem onClick={() => window.open(SOURCE_CODE, "_blank")}>
          <FileCode />
          Source Code
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </StrictMode>
)
