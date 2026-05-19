"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: FiHome },
  { name: "Users", href: "/users", icon: FiUsers },
  { name: "Settings", href: "/settings", icon: FiSettings },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={200}>
      <aside className="w-17.5 bg-white border-r hidden md:flex flex-col items-center py-2">
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={`/product/${item.href}`}
                    className={`p-3 rounded-lg transition flex items-center justify-center
                    ${
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={20} />
                  </Link>
                </TooltipTrigger>

                <TooltipContent side="right">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;