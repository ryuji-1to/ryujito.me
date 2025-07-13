"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const path = getPath(pathname);

  if (path === "") {
    return null;
  }

  return (
    <header className="sticky top-0 backdrop-blur-xs">
      <div className="max-w-2xl mx-auto px-24 sm:px-40 py-16 flex gap-4">
        <Link href="/" aria-label="トップページに戻る">
          <h1>
            <picture>
              <source srcSet="/icon.webp" type="image/webp" />
              <img
                src="/icon.jpg"
                width={24}
                height={24}
                alt="プロフィール画像"
                className="rounded-full"
                decoding="async"
              />
            </picture>
          </h1>
        </Link>
        <span className="text-gray-8 dark:text-dark-gray-8">/</span>
        <Link
          href={`/${path}`}
          className="text-main-text dark:text-dark-main-text"
          aria-current="page"
        >
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
