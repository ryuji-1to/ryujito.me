import { readFile, readdir } from "node:fs/promises";
import { Markdown } from "@/share/components/markdown";
import matter from "gray-matter";
import * as v from "valibot";
import { notFound } from "next/navigation";
import { initLinguiFromParams, type PageLangParam } from "@/app/init-lingui";
import type { Metadata } from "next";
import { markdownToHtml } from "@/share/lib";
import { Err, Ok, type Result } from "rustlike-ts";

const Schema = v.object({
  date: v.date(),
  html: v.string(),
});

type Slug = v.InferOutput<typeof Schema>;

async function getPostBySlug(
  slug: string,
): Promise<Result<Slug, "ValidationError" | "NotFound">> {
  const filename = `./public/${slug}/index.md`;
  try {
    const { content, data } = matter(await readFile(filename, "utf8"));
    const html = await markdownToHtml(content);
    return Ok(v.parse(Schema, { html, ...data }));
  } catch (error) {
    if (error instanceof v.ValiError) {
      return Err("ValidationError");
    }
    return Err("NotFound");
  }
}

export default async function PostPage(
  props: PageLangParam & {
    params: Promise<{ slug: string }>;
  },
) {
  const { i18n, lang } = await initLinguiFromParams(props.params);
  const result = await getPostBySlug((await props.params).slug);

  if (result.isErr()) {
    const error = result.expectErr("should error");
    if (error === "NotFound") {
      return notFound();
    }

    if (error === "ValidationError") {
      throw error;
    }
  }

  const data = result.unwrap();

  return (
    <article>
      <header className="mb-64">
        <p className="font-semibold text-xs w-fit ml-auto">
          <time dateTime={data.date.toLocaleDateString(lang)}>
            {i18n.date(data.date.toDateString())}
          </time>
        </p>
      </header>
      <Markdown>{data.html}</Markdown>
    </article>
  );
}

export async function generateStaticParams() {
  try {
    const entries = await readdir("./public/", { withFileTypes: true });
    const dirs = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
    return dirs.map((dir) => ({ slug: dir }));
  } catch {
    return { slug: "" };
  }
}

export async function generateMetadata(props: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  try {
    const params = await props.params;
    const file = await readFile(`./public/${params.slug}/index.md`, "utf8");
    const { data } = matter(file);

    return {
      title: `${data.title} | Ryuji Ito`,
      description: data.description || "",
    };
  } catch {
    return {
      title: "Ryuji Ito",
    };
  }
}
