import matter from "gray-matter";
import { readFile, readdir } from "node:fs/promises";
import { Text } from "@/share/components/text";
import { HiArrowLongLeft } from "react-icons/hi2";
import Link from "next/link";
import { formatMarkdown } from "@/share/lib";
import * as v from "valibot";
import { MarkDown } from "@/share/components/markdown";

const Schema = v.object({
  date: v.date(),
  value: v.string(),
});

async function getPostBySlug(slug: string) {
  const filename = `./public/${slug}/index.md`;
  const { content, data } = matter(await readFile(filename, "utf8"));

  const file = await formatMarkdown(content);

  return v.parse(Schema, { content, ...file, ...data });
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPostBySlug(params.slug);

  return (
    <article>
      <header className="flex items-center justify-between pb-8 mb-12 border-b dark:border-b-gray-700">
        <Link href="/" title="back">
          <HiArrowLongLeft
            className="text-gray-800 dark:text-gray-200"
            size={20}
          />
        </Link>
        <Text className="font-semibold text-xs">
          {data.date.toDateString()}
        </Text>
      </header>
      <MarkDown>{data.value}</MarkDown>
    </article>
  );
}

export async function generateStaticParams() {
  const entries = await readdir("./public/", { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  return dirs.map((dir) => ({ slug: dir }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const file = await readFile(`./public/${params.slug}/index.md`, "utf8");
  const { data } = matter(file);

  return {
    title: `${data.title} - Ryuji Ito`,
    description: data.description || "",
  };
}
