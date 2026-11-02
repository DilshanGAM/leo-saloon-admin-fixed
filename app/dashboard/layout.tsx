import type { ReactNode } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-50 rounded-md bg-background px-4 py-2 text-sm shadow-md focus:not-sr-only"
      >
        Skip to main content
      </a>

      <AppSidebar />

      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4 md:px-6">
          <SidebarTrigger />

          <span
            aria-hidden="true"
            className="h-4 w-px bg-border"
          />

          <span className="text-sm font-medium">
            Leo Saloon
          </span>

          <span className="ml-auto hidden text-xs text-muted-foreground sm:block">
            Administration
          </span>
        </header>

        <div
          id="main-content"
          tabIndex={-1}
          className="flex min-w-0 flex-1 flex-col gap-6 p-4 outline-none md:p-6"
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}