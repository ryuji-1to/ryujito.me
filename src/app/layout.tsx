import { Geist } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/share/lib";

export const metadata: Metadata = {
  title: "Ryuji Ito",
};

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
  style: ["normal"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="description" content="Personal Website by Ryuji Ito" />
      </head>
      <body
        className={cn(
          "antialiased dark:bg-gray-950 bg-gray-50 text-gray-800 dark:text-gray-200 print:bg-white",
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
