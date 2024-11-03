import Link from "next/link";
import { HiArrowLongLeft } from "react-icons/hi2";

export function ArticleLayout({
  children,
  renderHeaderLeft,
}: { children: React.ReactNode; renderHeaderLeft?: () => React.ReactNode }) {
  return (
    <article>
      <header className="flex items-center justify-between pb-8 mb-12 border-b dark:border-b-gray-700">
        <Link href="/" title="back">
          <HiArrowLongLeft
            className="text-gray-800 dark:text-gray-200"
            size={20}
          />
        </Link>
        {renderHeaderLeft?.()}
      </header>
      {children}
    </article>
  );
}
