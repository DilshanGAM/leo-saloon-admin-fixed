"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  LayoutDashboard,
  Package,
  Scissors,
  Settings,
  ShoppingBag,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const dailyOperations: NavigationItem[] = [
  {
    label: "Appointments",
    href: "/dashboard/appointments",
    icon: CalendarDays,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingBag,
  },
];

const catalog: NavigationItem[] = [
  {
    label: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    label: "Services",
    href: "/dashboard/services",
    icon: Scissors,
  },
];

const userLinks = [
  { label: "All users", href: "/dashboard/users" },
  { label: "Customers", href: "/dashboard/users/customers" },
  { label: "Staff members", href: "/dashboard/users/staff" },
  { label: "Activity logs", href: "/dashboard/users/activity" },
];

function matchesRoute(pathname: string, href: string) {
  // Dashboard should not stay active on every dashboard page.
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavigationLink({
  item,
  pathname,
}: {
  item: NavigationItem;
  pathname: string;
}) {
  const { setOpenMobile } = useSidebar();
  const active = matchesRoute(pathname, item.href);
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={
          <Link
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={() => setOpenMobile(false)}
          />
        }
        isActive={active}
        tooltip={item.label}
      >
        <Icon aria-hidden="true" />
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function UsersMenu({ pathname }: { pathname: string }) {
  const { state, isMobile, setOpen, setOpenMobile } = useSidebar();

  const sectionActive = matchesRoute(pathname, "/dashboard/users");
  const [expanded, setExpanded] = useState(sectionActive);

  // Mobile navigation remains fully labelled.
  const iconOnly = state === "collapsed" && !isMobile;
  const submenuVisible = expanded && !iconOnly;

  function toggleUsers() {
    if (iconOnly) {
      // Reveal the submenu when Users is clicked in the icon rail.
      setOpen(true);
      setExpanded(true);
      return;
    }

    setExpanded((current) => !current);
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        type="button"
        tooltip="Users"
        isActive={sectionActive}
        aria-expanded={submenuVisible}
        aria-controls="sidebar-users-submenu"
        onClick={toggleUsers}
      >
        <UsersRound aria-hidden="true" />
        <span>Users</span>

        <ChevronDown
          aria-hidden="true"
          className={`ml-auto transition-transform duration-200 motion-reduce:transition-none ${
            submenuVisible ? "rotate-180" : ""
          }`}
        />
      </SidebarMenuButton>

      <SidebarMenuSub
        id="sidebar-users-submenu"
        hidden={!submenuVisible}
      >
        {userLinks.map((item) => {
          // "All users" is active only on the combined table.
          const active =
            item.href === "/dashboard/users"
              ? pathname === item.href
              : matchesRoute(pathname, item.href);

          return (
            <SidebarMenuSubItem key={item.href}>
              <SidebarMenuSubButton
                render={
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpenMobile(false)}
                  />
                }
                isActive={active}
              >
                <span>{item.label}</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          );
        })}
      </SidebarMenuSub>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="Leo Saloon"
              render={
                <Link
                  href="/dashboard"
                  onClick={() => setOpenMobile(false)}
                />
              }
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Scissors className="size-4" aria-hidden="true" />
              </span>

              <span className="grid flex-1 text-left leading-tight">
                <span className="truncate font-semibold">
                  Leo Saloon
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Administration
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavigationLink
                pathname={pathname}
                item={{
                  label: "Dashboard",
                  href: "/dashboard",
                  icon: LayoutDashboard,
                }}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Daily operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dailyOperations.map((item) => (
                <NavigationLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Catalog</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {catalog.map((item) => (
                <NavigationLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Reopen the relevant submenu after navigation. */}
              <UsersMenu key={pathname} pathname={pathname} />

              <NavigationLink
                pathname={pathname}
                item={{
                  label: "Reports",
                  href: "/dashboard/reports",
                  icon: ChartNoAxesCombined,
                }}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <NavigationLink
            pathname={pathname}
            item={{
              label: "Settings",
              href: "/dashboard/settings",
              icon: Settings,
            }}
          />
        </SidebarMenu>

        {/* <Link href="/dashboard">Testing Link</Link>
        <a href="/dashboard">Testing Anchor</a> */}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}