import { fromAsyncCodeToHtml } from "@shikijs/markdown-it/async";
import matter from "gray-matter";
import MarkdownIt from "markdown-it-async";
import { codeToHtml } from "shiki";

const CONTENT_MARKDOWN_MODULES = import.meta.glob("../content/**/*.md", {
  query: "?raw",
  import: "default",
});

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

export async function getRawContentMarkdown(filePath: `${string}.md`) {
  const key = `../content/${filePath}`;
  const loader = CONTENT_MARKDOWN_MODULES[key];

  if (!loader) {
    throw new Error(`Markdown file was not found: ${filePath}`);
  }

  return (await loader()) as string;
}

export async function getRawPostMarkdownBySlug(slug: string) {
  const key = `../content/posts/${slug}/index.md`;
  const loader = CONTENT_MARKDOWN_MODULES[key];

  if (!loader) {
    return null;
  }

  return (await loader()) as string;
}

export async function getAllRawPostMarkdown() {
  const postEntries = Object.entries(CONTENT_MARKDOWN_MODULES).filter(
    ([key]) => key.startsWith("../content/posts/") && key.endsWith("/index.md"),
  );

  const loaded = await Promise.all(
    postEntries.map(async ([key, loader]) => {
      const match = key.match(/^\.\.\/content\/posts\/([^/]+)\/index\.md$/);
      if (!match) {
        return null;
      }

      const slug = match[1];
      if (!slug) {
        return null;
      }

      return {
        slug,
        content: (await loader()) as string,
      };
    }),
  );

  return loaded.filter((entry) => entry !== null);
}

export async function getFormattedMarkdown(filePath: `${string}.md`) {
  const f = await getRawContentMarkdown(filePath);
  const { content, data } = matter(f);
  const html = await markdownToHtml(content);

  return { content, html, ...data };
}
