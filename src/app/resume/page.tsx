import { Markdown } from "@/share/components/markdown";
import { getFormattedMarkdown } from "@/share/lib.server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Ryuji Ito",
  robots: "noindex, nofollow",
};

export default async function Resume() {
  const data = await getFormattedMarkdown("resume.md");
  return <Markdown>{data.html}</Markdown>;
}
