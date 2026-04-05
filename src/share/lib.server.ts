import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fromAsyncCodeToHtml } from "@shikijs/markdown-it/async";
import matter from "gray-matter";
import MarkdownIt from "markdown-it-async";
import { codeToHtml } from "shiki";

const CANDIDATE_DIRS = [
  path.join(process.cwd(), "public"),
  path.join(process.cwd(), ".output", "public"),
  "/var/task/public",
  "/var/task/.output/public",
] as const;

export async function resolvePublicDir() {
  for (const dir of CANDIDATE_DIRS) {
    try {
      await access(dir);
      return dir;
    } catch {
      // Try the next candidate.
    }
  }

  throw new Error(
    `Public directory was not found. Tried: ${CANDIDATE_DIRS.join(", ")}`,
  );
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
  const publicDir = await resolvePublicDir();
  const f = await readFile(path.join(publicDir, filePath), "utf8");
  const { content, data } = matter(f);
  const html = await markdownToHtml(content);

  return { content, html, ...data };
}
