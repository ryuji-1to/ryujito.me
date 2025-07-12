import { NavigationIndicator } from "@/share/components/navigation-indicator";
import Link from "next/link";

export function Profile() {
  return (
    <header>
      <Link
        href="/about"
        title="about"
        aria-label="トップページに戻る"
        className="block w-fit"
      >
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
        <p>
          フロントエンドのエンジニアとデザイナーをしています&nbsp;
          <span role="img" aria-hidden>
            🎨🧑‍💻
          </span>
        </p>
        <nav>
          <ul className="flex gap-4 text-sm">
            <li>
              <Link href="/about" className="underline">
                <NavigationIndicator
                  fallback={
                    <span className="text-gray-11 dark:text-dark-gray-11">
                      About
                    </span>
                  }
                >
                  About
                </NavigationIndicator>
              </Link>
            </li>
            <li className="text-gray-8 dark:text-dark-gray-8">/</li>
            <li>
              <Link href="/posts" className="underline">
                <NavigationIndicator
                  fallback={
                    <span className="text-gray-11 dark:text-dark-gray-11">
                      Posts
                    </span>
                  }
                >
                  Posts
                </NavigationIndicator>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
