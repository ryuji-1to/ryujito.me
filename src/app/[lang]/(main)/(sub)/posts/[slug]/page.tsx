import { readFile, readdir } from "node:fs/promises";
import { Markdown } from "@/share/components/markdown";
import matter from "gray-matter";
import * as v from "valibot";
import { notFound } from "next/navigation";
import { initLinguiFromParams, type PageLangParam } from "@/app/init-lingui";
import { markdownToHtml } from "@/share/lib";

const Schema = v.object({
  date: v.date(),
  html: v.string(),
});

async function getPostBySlug(slug: string) {
  const filename = `./public/${slug}/index.md`;
  try {
    const { content, data } = matter(await readFile(filename, "utf8"));
    const html = await markdownToHtml(content);
    return v.parse(Schema, { html, ...data });
  } catch (error) {
    if (error instanceof v.ValiError) {
      throw new Error("validation failed");
    }
    notFound();
  }
}

export default async function PostPage(
  props: PageLangParam & {
    params: Promise<{ slug: string }>;
  },
) {
  const { i18n } = await initLinguiFromParams(props.params);
  const data = await getPostBySlug((await props.params).slug);

  return (
    <article>
      <header className="mb-64">
        <p className="font-semibold text-xs w-fit ml-auto">
          {i18n.date(data.date.toDateString())}
        </p>
      </header>
      <Markdown>{data.html}</Markdown>
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

export async function generateMetadata(props: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const params = await props.params;
  const file = await readFile(`./public/${params.slug}/index.md`, "utf8");
  const { data } = matter(file);

  return {
    title: `Ryuji Ito | ${data.title}`,
    description: data.description || "",
  };
}
