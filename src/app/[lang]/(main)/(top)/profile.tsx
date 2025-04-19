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
      <div className="mt-16">
        <p>
          <Trans>Ryuji Ito is a Frontend Designer</Trans>{" "}
          <span role="img">🎨🧑‍💻</span>
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
