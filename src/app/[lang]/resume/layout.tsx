import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ryuji Ito | Resume",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="max-w-3xl mx-auto p-40">{children}</div>;
}
