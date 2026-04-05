import { Link } from "@tanstack/react-router";

export function Profile() {
  return (
    <header>
      <Link to="/about" title="about" className="block w-fit">
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
      </Link>
      <div className="mt-16">
        <p>フロントエンドエンジニアとデザイナーをしています</p>
        <nav>
          <ul className="flex gap-4 text-sm">
            <li>
              <Link to="/about" className="underline">
                自己紹介
              </Link>
            </li>
            <li className="text-sub-text dark:text-dark-sub-text">/</li>
            <li>
              <Link to="/posts" className="underline">
                ブログ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
