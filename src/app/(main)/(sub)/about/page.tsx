import { Markdown } from "@/share/components/markdown";
import { getFormattedMarkdown } from "@/share/lib.server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "自己紹介 | Ryuji Ito",
};

export default async function AboutPage() {
  const data = await getFormattedMarkdown("about.md");
  return <Markdown>{data.html}</Markdown>;
}
