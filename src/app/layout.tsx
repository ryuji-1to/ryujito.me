import { Geist } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/share/lib";

export const metadata: Metadata = {
  title: "Ryuji Ito",
};

const geist = Geist({
  subsets: ["latin"],
});

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
        <meta name="description" content="This is ryuji's personal website" />
      </head>
      <body
        className={cn(
          "antialiased dark:bg-gray-950 bg-gray-50 print:bg-white",
          geist.className,
        )}
      >
        <div className="min-h-screen flex flex-col max-w-3xl mx-auto p-10">
          {children}
        </div>
      </body>
    </html>
  );
}
