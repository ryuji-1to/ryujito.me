import { formatMarkdown } from "@/share/lib";
import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { MarkDown } from "@/share/components/markdown";

async function getAbout() {
  const { content, data } = matter(await readFile("./public/about.md", "utf8"));
  const file = await formatMarkdown(content);
  return { content, ...file, ...data };
}
export default async function AboutPage() {
  const data = await getAbout();
  return <MarkDown>{data.value}</MarkDown>;
}
