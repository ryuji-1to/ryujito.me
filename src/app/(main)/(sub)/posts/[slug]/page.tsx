import { readFile, readdir } from "node:fs/promises";
import { Markdown } from "@/share/components/markdown";
import matter from "gray-matter";
import * as v from "valibot";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { markdownToHtml } from "@/share/lib.server";
import { Err, Ok, type Result } from "rustlike-ts";
import { NOT_FOUND, VALIDATION_ERROR } from "@/share/constants";
import { formatDate } from "@/share/utils";

const Schema = v.object({
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
    return handleError(error);
  }

  const data = result.unwrap();

  return (
    <article>
      <header className="mb-64">
        <p className="font-semibold text-xs w-fit ml-auto">
          <time dateTime={data.date.toLocaleDateString()}>
            {formatDate(data.date)}
          </time>
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
}): Promise<Metadata> {
  const params = await props.params;
  const file = await readFile(`./public/${params.slug}/index.md`, "utf8");
  const { data } = matter(file);

  return {
    title: `${data.title} | Ryuji Ito`,
    description: data.description || "",
  };
}
