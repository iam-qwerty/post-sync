"use client"

import { useEffect } from "react"
import { useSidebar } from "@/components/ui/sidebar"

export function useSidebarShortcuts() {
  const { toggleSidebar, isMobile, openMobile, setOpenMobile } = useSidebar()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle Cmd+B (Mac) or Ctrl+B (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === "b") {
        event.preventDefault()
        toggleSidebar()
      }

      // Handle Escape key to close sidebar on mobile
      if (event.key === "Escape") {
        if (isMobile && openMobile) {
          event.preventDefault()
          setOpenMobile(false)
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar, isMobile, openMobile, setOpenMobile])
}
