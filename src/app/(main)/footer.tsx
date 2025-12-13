import { RiGithubLine, RiTwitterXFill } from "react-icons/ri";
export function Footer() {
  const start = 2024;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-24 bg-gray-2 dark:bg-dark-gray-2 space-y-16">
      <div className="mx-auto w-fit">
        <ul className="w-fit flex gap-x-8">
          <li>
            <a href="https://x.com/ryuji_1to">
              <RiTwitterXFill size={24} title="Follow me on X" />
            </a>
          </li>
          <li>
            <a href="https://github.com/ryuji-1to">
              <RiGithubLine size={24} title="Follow me on GitHub" />
            </a>
          </li>
        </ul>
      </div>
      <p className="text-center mx-auto">
        <small>
          &copy; <time>{start}</time>
          {currentYear > start && (
            <>
              {" - "}
              <time>{currentYear}</time>
            </>
          )}{" "}
          Ryuji Ito
        </small>
      </p>
    </footer>
  );
}
