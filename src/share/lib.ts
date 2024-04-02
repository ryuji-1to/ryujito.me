import rehypeShiki from "@shikijs/rehype";
import { clsx, type ClassValue } from "clsx";
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
