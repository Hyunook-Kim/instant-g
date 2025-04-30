"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  HomeFillIcon,
  HomeIcon,
  NewFillIcon,
  NewIcon,
  SearchFillIcon,
  SearchIcon,
} from "./ui/icons";

const menus = [
  { href: "/", icon: <HomeIcon />, activeIcon: <HomeFillIcon /> },
  { href: "/search", icon: <SearchIcon />, activeIcon: <SearchFillIcon /> },
  { href: "/post", icon: <NewIcon />, activeIcon: <NewFillIcon /> },
];

export default function Navbar() {
  const path = usePathname();
  console.log(path);

  return (
    <div className="sticky top-0 flex items-center justify-between border-b border-gray-300 p-4">
      <Link href="/" className="text-2xl font-bold">
        <h1 className="text-3xl font-bold">Instant</h1>
      </Link>
      <nav className="flex gap-4">
        <ul>
          <li>
            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className="flex items-center"
              >
                {path === menu.href ? menu.activeIcon : menu.icon}
              </Link>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
}
