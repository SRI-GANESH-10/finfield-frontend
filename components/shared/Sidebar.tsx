"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Rss,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type NavItem = { name: string; href: string; icon: React.ElementType };

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/product/dashboard", icon: LayoutDashboard },
  { name: "Feed", href: "/product/feed", icon: Rss },
];

const bottomItems: NavItem[] = [
  { name: "Settings", href: "/product/settings", icon: Settings },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname.startsWith(item.href);
    const Icon = item.icon;

    const link = (
      <Link
        href={item.href}
        className={`flex items-center gap-3 rounded-lg text-sm font-medium transition-all border-l-2
          ${expanded ? "px-3 py-2.5" : "p-2.5 justify-center"}
          ${
            isActive
              ? "bg-primary/10 text-primary border-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground border-transparent"
          }`}
      >
        <Icon size={18} className="shrink-0" />
        {expanded && <span>{item.name}</span>}
      </Link>
    );

    if (expanded) return link;

    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right">{item.name}</TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        className={`shrink-0 bg-card border-r hidden md:flex flex-col py-4 transition-all duration-300
          ${expanded ? "w-56 px-3" : "w-14 px-2"}`}
      >
        {/* Expand / collapse toggle */}
        <div className={`flex mb-3 ${expanded ? "justify-end" : "justify-center"}`}>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setExpanded((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground"
          >
            {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </Button>
        </div>

        {/* Main nav items */}
        <nav className="flex flex-col gap-0.5 flex-1">
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>

        {/* Settings pinned at bottom */}
        <Separator className="my-3" />
        <nav className="flex flex-col gap-0.5">
          {bottomItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
