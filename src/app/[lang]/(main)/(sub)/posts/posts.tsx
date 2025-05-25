import * as v from "valibot";
import { Ok, Err, type Result } from "rustlike-ts";
import { readFile, readdir } from "node:fs/promises";
import matter from "gray-matter";
import Link from "next/link";
import { i18n } from "@lingui/core";
import path from "node:path";
import { LinkIndicator } from "@/share/components/link-indicator";

type ZennPost = {
  type: "zenn";
  path: string;
  title?: string;
  date: Date;
};

const ZENN_URL = "https://zenn.dev/api/articles?username=ryuji_ito";

async function getZennPosts(): Promise<Result<ZennPost[], undefined>> {
  const res = await fetch(ZENN_URL, {
    next: {
      revalidate: 24 * 60 * 10,
    },
  });
  if (!res.ok) {
    return Err(undefined);
  }
  const data = await res.json();
  const validated = v.safeParse(
    v.array(
      v.object({
        title: v.optional(v.string()),
        path: v.string(),
        published_at: v.string(),
      }),
    ),
    data.articles,
  );
  if (!validated.success) {
    return Err(undefined);
  }

  return Ok(
    validated.output.toReversed().map((d) => ({
      type: "zenn",
      path: d.path,
      title: d.title,
      date: new Date(d.published_at),
    })),
  );
}

type MdPost = {
  type: "md";
  slug: string;
  title: string;
  date: Date;
};

async function getMdPosts(): Promise<Result<MdPost[], undefined>> {
  const dir = path.join(process.cwd(), "public");
  const entries = await readdir(dir, {
    withFileTypes: true,
  });
  const posts = entries.filter((f) => f.isDirectory()).map((file) => file.name);
  const contents = await Promise.all(
    posts.map((post) => readFile(`${dir}/${post}/index.md`, "utf-8")),
  );
  const data = posts.map((slug, i) => {
    const content = contents[i];
    if (!content) {
      return;
    }

    const { data } = matter(content);

    return { slug, ...data };
  });

  const validated = v.safeParse(
    v.array(
      v.object({
        slug: v.string(),
        title: v.string(),
        date: v.date(),
      }),
    ),
    data,
  );
  if (!validated.success) {
    return Err(undefined);
  }

  return Ok(
    validated.output.map((d) => ({
      type: "md",
      ...d,
    })),
  );
}

export async function Posts() {
  const [mdPosts, zennPosts] = await Promise.all([
    getMdPosts(),
    getZennPosts(),
  ]);

  return (
    <div className="space-y-40">
      <section aria-labelledby="md-posts">
        <h2 id="md-posts" className="mb-8 font-medium">
          Posts
        </h2>
        <ul className="list-disc ml-16 space-y-8">
          {mdPosts.unwrapOr([]).map((d) => (
            <li key={d.title}>
              <span className="flex gap-16 w-full items-center justify-between">
                <Link
                  prefetch={false}
                  href={`/posts/${d.slug}`}
                  className="text-sm hover:underline line-clamp-1"
                >
                  <LinkIndicator
                    fallback={
                      <span className="text-gray-11">
                        {d.title}&nbsp;
                        <span className="animate-spin inline-block">🌀</span>
                      </span>
                    }
                  >
                    {d.title}
                  </LinkIndicator>
                </Link>
                <time
                  dateTime={d.date.toLocaleDateString()}
                  className="text-xs hidden sm:block"
                >
                  {i18n.date(d.date.toDateString())}
                </time>
                <time
                  dateTime={d.date.toLocaleDateString()}
                  className="text-xs sm:hidden"
                >
                  {i18n.date(d.date, {
                    dateStyle: "short",
                  })}
                </time>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="zenn-posts">
        <h2 id="zenn-posts" className="mb-8 font-medium">
          Zenn
        </h2>
        <ul className="list-disc ml-16 space-y-8">
          {zennPosts.unwrapOr([]).map((d) => (
            <li key={d.title}>
              <span className="flex gap-16 w-full items-center justify-between">
                <a
                  href={`https://zenn.dev/${d.path}`}
                  className="text-sm hover:underline line-clamp-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  {d.title}
                </a>
                <time
                  dateTime={d.date.toLocaleDateString()}
                  className="text-xs hidden sm:block"
                >
                  {i18n.date(d.date.toDateString())}
                </time>
                <time
                  dateTime={d.date.toLocaleDateString()}
                  className="text-xs sm:hidden"
                >
                  {i18n.date(d.date, {
                    dateStyle: "short",
                  })}
                </time>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
