import matter from "gray-matter";
import { readFile, readdir } from "node:fs/promises";
import { Text } from "@/share/components/text";
import { formatMarkdown } from "@/share/lib";
import * as v from "valibot";
import { Markdown } from "@/share/components/markdown";
import { ArticleLayout } from "../../article-layout";

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

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const data = await getPostBySlug(params.slug);

  return (
    <ArticleLayout
      renderHeaderRight={() => {
        return (
          <Text className="font-semibold text-xs">
            {data.date.toDateString()}
          </Text>
        );
      }}
    >
      <Markdown>{data.value}</Markdown>
    </ArticleLayout>
  );
}

export async function generateStaticParams() {
  const entries = await readdir("./public/", { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  return dirs.map((dir) => ({ slug: dir }));
}

export async function generateMetadata(props: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const params = await props.params;
  const file = await readFile(`./public/${params.slug}/index.md`, "utf8");
  const { data } = matter(file);

  return {
    title: `${data.title} - Ryuji Ito`,
    description: data.description || "",
  };
}
