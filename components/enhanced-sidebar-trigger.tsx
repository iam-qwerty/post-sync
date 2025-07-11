"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface EnhancedSidebarTriggerProps {
  className?: string
  showTooltip?: boolean
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
}

export function EnhancedSidebarTrigger({
  className,
  showTooltip = true,
  variant = "ghost",
  size = "icon",
}: EnhancedSidebarTriggerProps) {
  const { toggleSidebar, state, isMobile } = useSidebar()

  const isCollapsed = state === "collapsed"
  const Icon = isCollapsed ? PanelLeftOpen : PanelLeftClose

  const trigger = (
    <Button
      variant={variant}
      size={size}
      onClick={toggleSidebar}
      className={cn(
        "transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className,
      )}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      data-state={isCollapsed ? "closed" : "open"}
    >
      <Icon className="h-4 w-4 transition-transform duration-200" />
      <span className="sr-only">{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
    </Button>
  )

  if (!showTooltip || isMobile) {
    return trigger
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent side="right">
          <p>{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</p>
          <p className="text-xs text-muted-foreground">⌘B</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
