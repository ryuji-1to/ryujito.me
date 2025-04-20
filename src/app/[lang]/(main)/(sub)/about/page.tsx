import { initLinguiFromParams, type PageLangParam } from "@/app/init-lingui";
import { Markdown } from "@/share/components/markdown";
import { formatMarkdown } from "@/share/lib";
import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import type { Metadata } from "next";
import path from "node:path";

export const metadata: Metadata = {
  title: "Ryuji Ito | About",
};

async function getFormattedMarkdown() {
  const { content, data } = matter(
    await readFile(path.join(process.cwd(), "public/about.md"), "utf8"),
  );
  const file = await formatMarkdown(content);
  return { content, ...file, ...data };
}

export default async function AboutPage(props: PageLangParam) {
  await initLinguiFromParams(props.params);
  const data = await getFormattedMarkdown();
  return <Markdown>{data.value}</Markdown>;
}
