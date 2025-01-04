import { RiGithubFill, RiTwitterXFill } from "react-icons/ri";
import Link from "next/link";
import { TimeLine } from "./timeline";

export default function Home() {
  return (
    <div>
      <header className="flex items-center justify-between mb-10">
        <div>
          <Link href="/about">
            <h1 className="font-bold text-2xl">Ryuji Ito</h1>
            <span className="text-xs">Software Engineer</span>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/about" title="about" aria-label="link for about">
            <img
              src="https://github.com/ryuji-1to.png"
              width={24}
              height={24}
              alt="my avatar"
              className="rounded-full"
            />
          </Link>
          <a
            href="https://github.com/ryuji-1to"
            target="_blank"
            rel="noreferrer"
            aria-label="link for ryuji's github account"
          >
            <RiGithubFill className="dark:text-gray-50" size={24} />
          </a>
          <a
            href="https://twitter.com/ryuji_program"
            target="_blank"
            rel="noreferrer"
            aria-label="link for ryuji's x account"
          >
            <RiTwitterXFill className="dark:text-gray-50" size={22} />
          </a>
        </div>
      </header>
      <div className="p-4">
        <TimeLine />
      </div>
    </div>
  );
}
