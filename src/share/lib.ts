import { readdir, readFile } from "node:fs/promises";
import rehypeShiki from "@shikijs/rehype";
import { type ClassValue, clsx } from "clsx";
import matter from "gray-matter";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { twMerge } from "tailwind-merge";
import { unified } from "unified";
import path from "node:path";

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

// export async function getFormattedMarkdown(filePath: `${string}.md`) {
//   const { content, data } = matter(
//     await readFile(path.join(process.cwd(), `public/${filePath}`), "utf8"),
//   );
//   const file = await formatMarkdown(content);
//   return { content, ...file, ...data };
// }

export async function getFormattedMarkdown(fileName: `${string}.md`) {
  const dir = path.join(process.cwd(), "public");
  const entries = await readdir(dir, {
    withFileTypes: true,
  });

  const targetFile = entries.find((entry) => entry.name === fileName);
  if (!targetFile) {
    throw new Error(`File not found: ${fileName} in directory ${targetFile}`);
  }
  const fileContent = await readFile(`${dir}/${fileName}`, "utf8");
  const { content, data } = matter(fileContent);
  const file = await formatMarkdown(content);

  return { content, ...file, ...data };
}
