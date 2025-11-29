import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { contentType, generatePostImage, size } from "@/og/generate-image";

export const dynamic = "force-static";

export const alt = "Ryuji Ito";

export { size, contentType };

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filename = `./public/${slug}/index.md`;
  const file = await readFile(filename, "utf8");
  const { data } = matter(file);
  return generatePostImage({ title: data.title });
}

export { generateStaticParams } from "./page";
