import { Trans } from "@lingui/react/macro";
import Link from "next/link";

export function Profile() {
  return (
    <header>
      <Link href="/about" title="about" aria-label="link for about">
        <img
          src="/icon.jpg"
          width={56}
          height={56}
          alt="my avatar"
          className="rounded-full"
        />
      </Link>
      <div className="text-gray-600 dark:text-gray-500 mt-4">
        <p>
          <Trans>Ryuji Ito is a Frontend Designer</Trans>{" "}
          <span role="img">🎨🧑‍💻</span>
        </p>
        <ul className="flex gap-1 text-sm">
          <li>
            <Link href="/about" className="text-blue-500 hover:underline">
              SNS
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/posts" className="text-blue-500 hover:underline">
              Posts
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
