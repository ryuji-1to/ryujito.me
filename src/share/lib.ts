import { readFile } from "node:fs/promises";
import { type ClassValue, clsx } from "clsx";
import matter from "gray-matter";
import { twMerge } from "tailwind-merge";
import path from "node:path";
import MarkdownIt from "markdown-it-async";
import { fromAsyncCodeToHtml } from "@shikijs/markdown-it/async";
import { codeToHtml } from "shiki";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function markdownToHtml(content: string) {
  const md = MarkdownIt();
  md.use(
    fromAsyncCodeToHtml(codeToHtml, {
      themes: {
        light: "github-dark",
        dark: "dracula",
      },
    }),
  );
  const html = await md.renderAsync(content);
  return html;
}

export async function getFormattedMarkdown(filePath: `${string}.md`) {
  const f = await readFile(
    path.join(process.cwd(), `public/${filePath}`),
    "utf8",
  );
  const { content, data } = matter(f);
  const html = await markdownToHtml(content);

  return { content, html, ...data };
}
