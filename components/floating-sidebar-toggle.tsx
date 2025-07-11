"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function FloatingSidebarToggle() {
  const { toggleSidebar, openMobile, isMobile } = useSidebar()

  if (!isMobile) return null

  return (
    <Button
      variant="default"
      size="icon"
      onClick={toggleSidebar}
      className={cn(
        "fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg",
        "bg-blue-600 hover:bg-blue-700 text-white",
        "transition-all duration-300 ease-in-out",
        "md:hidden", // Only show on mobile
      )}
      aria-label={openMobile ? "Close menu" : "Open menu"}
    >
      {openMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  )
}
