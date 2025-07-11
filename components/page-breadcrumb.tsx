"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Plus, Calendar, BarChart3, History, Settings } from "lucide-react"

const routeMap: Record<string, { label: string; icon?: React.ComponentType<{ className?: string }> }> = {
  "/dashboard": { label: "Dashboard", icon: Home },
  "/create": { label: "Create Post", icon: Plus },
  "/calendar": { label: "Calendar", icon: Calendar },
  "/analytics": { label: "Analytics", icon: BarChart3 },
  "/history": { label: "History", icon: History },
  "/settings": { label: "Settings", icon: Settings },
}

export function PageBreadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  // Build breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/")
    const route = routeMap[path]
    const isLast = index === pathSegments.length - 1

    return {
      path,
      label: route?.label || segment.charAt(0).toUpperCase() + segment.slice(1),
      icon: route?.icon,
      isLast,
    }
  })

  if (breadcrumbItems.length === 0) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={item.path} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage className="flex items-center gap-1">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.path} className="flex items-center gap-1">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
