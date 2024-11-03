import { getFormattedMarkdown } from "@/share/lib";
import { Markdown } from "@/share/components/markdown";
import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowLongLeft } from "react-icons/hi2";
import { ArticleLayout } from "../article-layout";

export const metadata: Metadata = {
  title: "Ryuji Ito | About",
};

export default async function AboutPage() {
  const data = await getFormattedMarkdown("about.md");
  return (
    <ArticleLayout>
      <Markdown>{data.value}</Markdown>
    </ArticleLayout>
  );
}
