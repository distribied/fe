"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Home,
  LogOut,
  Settings,
  User,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    name: "Categories",
    href: "/admin/category",
    icon: FolderTree,
  },
  {
    name: "Products",
    href: "/admin/product",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/admin/order",
    icon: ShoppingCart,
  },
  {
    name: "Accounts",
    href: "/admin/account",
    icon: Users,
  },
];

function NavLink({
  item,
  onClick,
}: Readonly<{
  item: (typeof navigation)[0];
  onClick?: () => void;
}>) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.name}</span>
    </Link>
  );
}

function Sidebar() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6 text-primary" />
          <span className="text-lg">Admin Panel</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>
      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground">© 2026 Kiều Sâm</p>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r bg-background md:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
          {/* Mobile Menu */}
          <div className="flex items-center gap-4 md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="h-full">
                  <div className="flex h-16 items-center border-b px-6">
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Package className="h-6 w-6 text-primary" />
                      <span className="text-lg">Admin Panel</span>
                    </Link>
                  </div>
                  <nav className="space-y-1 px-3 py-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.href}
                        item={item}
                        onClick={() => setMobileMenuOpen(false)}
                      />
                    ))}
                  </nav>
                  <div className="absolute bottom-0 w-full border-t p-4">
                    <p className="text-xs text-muted-foreground">
                      © 2026 Kiều Sâm
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Page Title - Hidden on mobile when menu can show */}
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="cursor-pointer">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Back to Website</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-muted/40 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
