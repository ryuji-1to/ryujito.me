import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ryuji Ito | Resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="print:bg-white">
      <div className="max-w-3xl mx-auto p-10">{children}</div>
    </body>
  );
}
