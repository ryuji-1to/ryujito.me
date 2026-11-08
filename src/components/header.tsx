export function Header({ pathname }: { pathname: string }) {
  const path = getPath(pathname);

  if (path === null) {
    return null;
  }

  return (
    <header className="sticky top-0 backdrop-blur-xs z-[calc(1/0)]">
      <div className="max-w-2xl mx-auto px-24 sm:px-40 py-16 flex gap-4 items-center">
        <a href="/" aria-label="トップページに戻る">
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
        </a>
        <span className="text-gray-8 dark:text-dark-gray-8">/</span>
        <a
          href={path.path}
          className="text-main-text dark:text-dark-main-text text-sm"
          aria-current="page"
        >
          {path.label}
        </a>
      </div>
    </header>
  );
}

function getPath(pathname: string) {
  if (pathname.startsWith("/posts")) {
    return { path: "/posts", label: "ブログ" };
  }
  if (pathname.startsWith("/about")) {
    return { path: "/about", label: "自己紹介" };
  }
  return null;
}
