import { Markdown } from "@/share/components/markdown";
import { getFormattedMarkdown } from "@/share/lib";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ryuji Ito | Resume",
};

export default async function Resume() {
  const data = await getFormattedMarkdown("resume.md");
  return <Markdown>{data.value}</Markdown>;
}
