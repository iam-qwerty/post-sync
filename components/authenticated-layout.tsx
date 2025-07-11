"use client"

import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { EnhancedSidebarTrigger } from "@/components/enhanced-sidebar-trigger"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { FloatingSidebarToggle } from "@/components/floating-sidebar-toggle"
import { SidebarStateIndicator } from "@/components/sidebar-state-indicator"
import { useSidebarShortcuts } from "@/hooks/use-sidebar-shortcuts"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

// Inner component that uses the sidebar hooks
function AuthenticatedLayoutContent({ children }: AuthenticatedLayoutProps) {
  // Now this hook is called within the SidebarProvider context
  useSidebarShortcuts()

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-100 dark:border-gray-800 px-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 sticky top-0 z-40">
          <EnhancedSidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <PageBreadcrumb />

          {/* Right side navigation elements */}
          <div className="ml-auto flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notification Icon with Badge */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-2xl h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    3
                  </Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 rounded-2xl p-2 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-4 py-3 border-b dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">You have 3 unread notifications</p>
                </div>
                <div className="py-2">
                  <DropdownMenuItem className="flex items-start gap-3 p-3 rounded-xl dark:hover:bg-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm dark:text-white">Post published successfully</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Your post was published to Twitter and LinkedIn
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">2 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-start gap-3 p-3 rounded-xl dark:hover:bg-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm dark:text-white">Scheduled post reminder</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Your post will be published in 1 hour</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">45 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-start gap-3 p-3 rounded-xl dark:hover:bg-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm dark:text-white">Account connection expired</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Please reconnect your Facebook account</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">1 day ago</p>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem className="text-center text-blue-600 dark:text-blue-400 font-medium">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-2xl p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold text-sm">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-4 py-3 border-b dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white">John Doe</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">john@example.com</p>
                </div>
                <DropdownMenuItem className="rounded-xl dark:hover:bg-gray-700 dark:text-gray-200">
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl dark:hover:bg-gray-700 dark:text-gray-200">
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl dark:hover:bg-gray-700 dark:text-gray-200">
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem className="rounded-xl dark:hover:bg-gray-700 dark:text-gray-200">
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex-1 overflow-auto bg-gray-50/30 dark:bg-gray-900/30">{children}</div>
        <FloatingSidebarToggle />
        <SidebarStateIndicator />
      </SidebarInset>
    </>
  )
}

// Main component that provides the sidebar context
export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <SidebarProvider>
      <AuthenticatedLayoutContent>{children}</AuthenticatedLayoutContent>
    </SidebarProvider>
  )
}
