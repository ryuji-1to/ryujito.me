"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const path = getPath(pathname);

  if (path === "") {
    // TODO
    return null;
  }

  return (
    <header className="sticky top-0 backdrop-blur-xs">
      <div className="max-w-2xl mx-auto px-40 py-16 flex gap-4">
        <Link href="/">
          <img
            src="/icon.jpg"
            width={24}
            height={24}
            alt="my avatar"
            className="rounded-full"
          />
        </Link>
        <span className="text-gray-8 dark:text-gray-4">/</span>
        <Link href={`/${path}`} className="text-gray-11 dark:text-gray-4">
          {path}
        </Link>
      </div>
    </header>
  );
}

function getPath(pathname: string) {
  // 先頭に /en や /ja などの2文字の言語コードがあれば除去
  const pathWithoutLocale = pathname.replace(/^\/(en|ja)(?=\/|$)/, "");

  if (pathWithoutLocale.startsWith("/posts")) {
    return "posts";
  }
  if (pathWithoutLocale.startsWith("/about")) {
    return "about";
  }
  return "";
}
