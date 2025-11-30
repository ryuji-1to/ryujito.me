import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Err, Ok, type Result } from "rustlike-ts";
import * as v from "valibot";
import { Markdown } from "@/share/components/markdown";
import { NOT_FOUND, VALIDATION_ERROR } from "@/share/constants";
import { markdownToHtml } from "@/share/lib.server";
import { formatDate } from "@/share/utils";

const Schema = v.object({
  title: v.string(),
  date: v.date(),
  html: v.string(),
});

type Slug = v.InferOutput<typeof Schema>;

async function getPostBySlug(
  slug: string,
): Promise<Result<Slug, typeof VALIDATION_ERROR | typeof NOT_FOUND>> {
  const filename = `./public/${slug}/index.md`;
  try {
    const { content, data } = matter(await readFile(filename, "utf8"));
    const html = await markdownToHtml(content);
    const validated = v.safeParse(Schema, { html, ...data });
    return validated.success ? Ok(validated.output) : Err(VALIDATION_ERROR);
  } catch {
    return Err(NOT_FOUND);
  }
}

function handleError(error: typeof VALIDATION_ERROR | typeof NOT_FOUND) {
  if (error === NOT_FOUND) {
    notFound();
  }

  if (error === VALIDATION_ERROR) {
    throw error;
  }
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const result = await getPostBySlug((await props.params).slug);

  if (result.isErr()) {
    const error = result.expectErr("should error");
    handleError(error);
  }

  const data = result.unwrap();

  return (
    <article>
      <header className="my-40 pb-8 space-y-40 border-b border-b-gray-4 dark:border-b-dark-gray-4">
        {/* <p>
          <Link
            href="/posts"
            className="text-xs text-sub-text dark:text-dark-sub-text"
          >
            ← 記事一覧に戻る
          </Link>
        </p> */}
        <div className="space-y-16">
          <h1 className="text-xl text-center text-balance">{data.title}</h1>
          <p className="text-xs w-fit ml-auto text-sub-text dark:text-dark-sub-text">
            <time dateTime={data.date.toLocaleDateString()}>
              {formatDate(data.date)}
            </time>
          </p>
        </div>
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
}): Promise<Metadata> {
  const params = await props.params;
  const file = await readFile(`./public/${params.slug}/index.md`, "utf8");
  const { data } = matter(file);

  return {
    title: `${data.title} | Ryuji Ito`,
    description: data.description || "",
  };
}
