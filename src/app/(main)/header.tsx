"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const path = getPath(pathname);
  return (
    <header className="sticky top-0 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-10 py-3 flex gap-1.5">
        <Link href="/">
          <img
            src="/icon.jpg"
            width={24}
            height={24}
            alt="my avatar"
            className="rounded-full"
          />
        </Link>
        <span className="text-gray-400">/</span>
        <Link href={`/${path}`}>{path}</Link>
      </div>
    </header>
  );
}

function getPath(pathname: string) {
  if (pathname.startsWith("/posts")) {
    return "posts";
  }
  if (pathname.startsWith("/about")) {
    return "about";
  }
  return "";
}
