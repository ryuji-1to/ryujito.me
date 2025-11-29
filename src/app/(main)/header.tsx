"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const path = getPath(pathname);

  if (path === null) {
    return null;
  }

  return (
    <header className="sticky top-0 backdrop-blur-xs z-[calc(1/0)]">
      <div className="max-w-2xl mx-auto px-24 sm:px-40 py-16 flex gap-4 items-center">
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
          href={path.path}
          className="text-main-text dark:text-dark-main-text text-sm"
          aria-current="page"
        >
          {path.label}
        </Link>
      </div>
    </header>
  );
}

function getPath(pathname: string) {
  const pathWithoutLocale = pathname.replace(/^\/(en|ja)(?=\/|$)/, "");

  if (pathWithoutLocale.startsWith("/posts")) {
    return { path: "/posts", label: "ブログ" };
  }
  if (pathWithoutLocale.startsWith("/about")) {
    return { path: "/about", label: "自己紹介" };
  }
  return null;
}
