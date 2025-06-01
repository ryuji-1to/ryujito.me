import { NavigationIndicator } from "@/share/components/navigation-indicator";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";
import Link from "next/link";

export function Profile() {
  const { t } = useLingui();
  return (
    <header>
      <Link
        href="/about"
        title="about"
        aria-label={t`トップページに戻る`}
        className="block w-fit"
      >
        <picture>
          <source srcSet="/icon.webp" type="image/webp" />
          <img
            src="/icon.jpg"
            width={56}
            height={56}
            alt={t`avatar`}
            className="rounded-full"
            decoding="async"
          />
        </picture>
      </Link>
      <div className="mt-16">
        <p>
          <Trans>Ryuji Ito is a Frontend Designer</Trans>&nbsp;
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
                      <Trans>About</Trans>
                    </span>
                  }
                >
                  <Trans>About</Trans>
                </NavigationIndicator>
              </Link>
            </li>
            <li className="text-gray-8 dark:text-dark-gray-8">/</li>
            <li>
              <Link href="/posts" className="underline">
                <NavigationIndicator
                  fallback={
                    <span className="text-gray-11 dark:text-dark-gray-11">
                      <Trans>Posts</Trans>
                    </span>
                  }
                >
                  <Trans>Posts</Trans>
                </NavigationIndicator>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
