import { readFile, readdir } from "node:fs/promises";
import rehypeShiki from "@shikijs/rehype";
import { type ClassValue, clsx } from "clsx";
import matter from "gray-matter";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { twMerge } from "tailwind-merge";
import { unified } from "unified";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function formatMarkdown(html: string) {
  return await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeShiki, {
      themes: {
        light: "github-dark",
        dark: "dracula",
      },
    })
    .use(rehypeStringify)
    .process(html);
}

export async function getFormattedMarkdown(filePath: `${string}.md`) {
  await readdir("public");
  const { content, data } = matter(
    await readFile(`public/${filePath}`, "utf8"),
  );
  const file = await formatMarkdown(content);
  return { content, ...file, ...data };
}
