"use client"

import { useSidebar } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { PanelLeft, PanelLeftClose } from "lucide-react"

export function SidebarStateIndicator() {
  const { state, isMobile } = useSidebar()

  if (isMobile) return null

  const isCollapsed = state === "collapsed"

  return (
    <div className="fixed bottom-4 left-4 z-40 opacity-75 hover:opacity-100 transition-opacity">
      <Badge variant="secondary" className="flex items-center gap-1 text-xs">
        {isCollapsed ? (
          <>
            <PanelLeftClose className="h-3 w-3" />
            Collapsed
          </>
        ) : (
          <>
            <PanelLeft className="h-3 w-3" />
            Expanded
          </>
        )}
      </Badge>
    </div>
  )
}
