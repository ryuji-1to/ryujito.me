import Link from "next/link";

export function Profile() {
  return (
    <header>
      <Link href="/about" title="about" aria-label="link for about">
        <img
          src="https://github.com/ryuji-1to.png"
          width={56}
          height={56}
          alt="my avatar"
          className="rounded-full"
        />
      </Link>
      <div className="text-gray-600 mt-4">
        <p>Ryuji Ito is a Software Engineer.</p>
        <p>
          SNS links is{" "}
          <Link href="/about" className="text-blue-500">
            here
          </Link>
          .
        </p>
        <p>
          Posts is{" "}
          <Link href="/posts" className="text-blue-500">
            here
          </Link>
          .
        </p>
      </div>
    </header>
  );
}
