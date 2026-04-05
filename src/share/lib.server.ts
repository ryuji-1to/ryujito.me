import { readFile } from "node:fs/promises";
import path from "node:path";
import { fromAsyncCodeToHtml } from "@shikijs/markdown-it/async";
import matter from "gray-matter";
import MarkdownIt from "markdown-it-async";
import { codeToHtml } from "shiki";

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
