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
        aria-label="トップページに戻る"
        className="block w-fit"
      >
        <img
          src="/icon.jpg"
          width={56}
          height={56}
          alt={t`avatar`}
          className="rounded-full"
        />
      </Link>
      <div className="mt-16">
        <p>
          <Trans>Ryuji Ito is a Frontend Designer</Trans>{" "}
          <span role="img" aria-hidden>
            🎨🧑‍💻
          </span>
        </p>
        <ul className="flex gap-4 text-sm">
          <li>
            <Link href="/about" className=" hover:underline">
              About
            </Link>
          </li>
          <li className="text-gray-8 dark:text-dark-gray-8">/</li>
          <li>
            <Link href="/posts" className="hover:underline">
              Posts
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
