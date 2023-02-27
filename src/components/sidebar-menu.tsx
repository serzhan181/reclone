"use client";

import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import { ReactElement } from "react";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarOption {
  icon: ReactElement;
  title: string;
  href: string;
}

const SIDEBAR_OPTIONS: SidebarOption[] = [
  {
    icon: <HomeIcon className="w-6 h-6" />,
    title: "Home",
    href: "/",
  },
];

export const SidebarMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-5 basis-[20%]">
      <div className="flex gap-2">
        <h2 className="text-sm font-semibold uppercase pl-9">Menu</h2>
      </div>

      <ul className="flex flex-col gap-5">
        {SIDEBAR_OPTIONS.map((o) => (
          <li
            key={o.title}
            className={classNames("py-2 pl-3 transition-all duration-100", {
              "border-l-8 border-l-primary bg-primary/20 text-primary":
                o.href.includes(pathname),
            })}
          >
            <Link className="flex items-center gap-3" href={o.href}>
              <span>{o.icon}</span>
              <p>{o.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
