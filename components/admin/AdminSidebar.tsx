"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Package, Users, ShoppingCart } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar className="min-h-screen border-r">
        <SidebarHeader className="p-4 border-b">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/admin"}
                className="w-full"
              >
                <Link href="/admin" className="flex items-center px-4 py-2">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/admin/order"}
                className="w-full"
              >
                <Link href="/admin/order" className="flex items-center px-4 py-2">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Orders
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/admin/inventory"}
                className="w-full"
              >
                <Link href="/admin/inventory" className="flex items-center px-4 py-2">
                  <Package className="mr-2 h-4 w-4" />
                  Inventory
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/admin/loyalty"}
                className="w-full"
              >
                <Link href="/admin/loyalty" className="flex items-center px-4 py-2">
                  <Users className="mr-2 h-4 w-4" />
                  Loyalty Members
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

