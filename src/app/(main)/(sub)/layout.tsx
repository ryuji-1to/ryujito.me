import Link from "next/link";
import { HiArrowLongLeft } from "react-icons/hi2";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <article>
      <header className="flex items-center justify-between pb-6 mb-6 dark:border-b-gray-700">
        <Link href="/" title="back">
          <HiArrowLongLeft
            className="text-gray-800 dark:text-gray-200"
            size={20}
          />
        </Link>
      </header>
      {children}
    </article>
  );
}
