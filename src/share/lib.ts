import { readFile } from "node:fs/promises";
// import rehypeShiki from "@shikijs/rehype";
import { type ClassValue, clsx } from "clsx";
import matter from "gray-matter";
// import rehypeStringify from "rehype-stringify";
// import remarkGfm from "remark-gfm";
// import remarkParse from "remark-parse";
// import remarkRehype from "remark-rehype";
import { twMerge } from "tailwind-merge";
// import { unified } from "unified";
import path from "node:path";
import MarkdownIt from "markdown-it-async";
import { fromAsyncCodeToHtml } from "@shikijs/markdown-it/async";
import { codeToHtml } from "shiki";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export async function formatMarkdown(
//   html: Parameters<(typeof unified)["process"]>[0],
// ) {
//   return await unified()
//     .use(remarkParse)
//     .use(remarkRehype)
//     .use(remarkGfm)
//     .use(rehypeShiki, {
//       themes: {
//         light: "github-dark",
//         dark: "dracula",
//       },
//     })
//     .use(rehypeStringify)
//     .process(html);
// }

export async function markdown(content: string) {
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
  const html = await markdown(content);

  return { content, html, ...data };
}
