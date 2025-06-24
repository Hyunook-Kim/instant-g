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
import ColorButton from "./ui/ColorButton";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";

const menus = [
  { href: "/", icon: <HomeIcon />, activeIcon: <HomeFillIcon /> },
  { href: "/search", icon: <SearchIcon />, activeIcon: <SearchFillIcon /> },
  { href: "/post", icon: <NewIcon />, activeIcon: <NewFillIcon /> },
];

export default function Navbar() {
  const path = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex items-center justify-between px-6">
      <Link href="/">
        <h1 className="text-3xl font-bold">Instant</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-4 p-4">
          {menus.map((menu) => (
            <li key={menu.href}>
              <Link href={menu.href}>
                {path === menu.href ? menu.activeIcon : menu.icon}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size={"small"} highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text="Log Out" onClick={() => signOut()} />
            ) : (
              <ColorButton text="Log In" onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
