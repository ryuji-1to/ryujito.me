export function Profile() {
  return (
    <header>
      <a href="/about" title="about" className="block w-fit">
        <picture>
          <source srcSet="/icon.webp" type="image/webp" />
          <img
            src="/icon.jpg"
            width={56}
            height={56}
            alt="プロフィール画像"
            className="rounded-full"
            decoding="async"
          />
        </picture>
      </a>
      <div className="mt-16">
        <p>フロントエンドエンジニアとデザイナーをしています</p>
        <nav>
          <ul className="flex gap-4 text-sm">
            <li>
              <a href="/about" className="underline">
                自己紹介
              </a>
            </li>
            <li className="text-sub-text dark:text-dark-sub-text">/</li>
            <li>
              <a href="/posts" className="underline">
                ブログ
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
