import matter from "gray-matter";
import { readFile } from "fs/promises";
import { Text } from "@/share/components/text";
import { HiArrowLongLeft } from "react-icons/hi2";
import Link from "next/link";
import { formatMarkdown } from "@/share/lib";
import { date, object, parse, string } from "valibot";

const Schema = object({
  date: date(),
  value: string(),
});

async function getPostBySlug(slug: string) {
  const filename = `./public/${slug}/index.md`;
  const { content, data } = matter(await readFile(filename, "utf8"));

  const file = await formatMarkdown(content);

  return parse(Schema, { content, ...file, ...data });
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPostBySlug(params.slug);

  return (
    <article>
      <header className="flex items-center justify-between mb-10">
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
      <div
        className="prose prose-md dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: data.value }}
      />
    </article>
  );
}
