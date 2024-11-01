"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const start = 2024;
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  // TODO: レイアウトを見直す
  if (pathname === "/resume") {
    return null;
  }
  return (
    <footer className="pt-10 text-center">
      <small>
        © {start}
        {currentYear > start ? ` - ${currentYear}` : ""} Ryuji Ito
      </small>
    </footer>
  );
}
