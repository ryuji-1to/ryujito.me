import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/share/lib";
import { Footer } from "./footer";

export const metadata: Metadata = {
  title: "Ryuji Ito",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>🐶</text></svg>"
        />
      </head>
      <body
        className={cn(
          "min-h-screen antialiased flex flex-col dark:bg-gray-950 bg-gray-50",
          GeistSans.className
        )}
      >
        <div className="flex-1 flex flex-col w-[764px] mx-auto p-10">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
