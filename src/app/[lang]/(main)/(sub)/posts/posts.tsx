import * as v from "valibot";
import { readFile, readdir } from "node:fs/promises";
import matter from "gray-matter";
import Link from "next/link";
import { i18n } from "@lingui/core";
import path from "node:path";

type ZennPost = {
  type: "zenn";
  path: string;
  title?: string;
  date: Date;
};

const ZENN_URL = "https://zenn.dev/api/articles?username=ryuji_ito";

async function getZennPosts(): Promise<ZennPost[]> {
  const res = await fetch(ZENN_URL, {
    next: {
      revalidate: 24 * 60 * 10,
    },
  });
  const data = await res.json();
  const validated = v.parse(
    v.array(
      v.object({
        title: v.optional(v.string()),
        path: v.string(),
        published_at: v.string(),
      }),
    ),
    data.articles,
  );
  return validated.toReversed().map((d) => ({
    type: "zenn",
    path: d.path,
    title: d.title,
    date: new Date(d.published_at),
  }));
}

type MdPosts = {
  type: "md";
  slug: string;
  title: string;
  date: Date;
};

async function getMdPosts(): Promise<MdPosts[]> {
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
      throw new Error("content not found");
    }

    const { data } = matter(content);

    return { slug, ...data };
  });

  const validated = v.parse(
    v.array(
      v.object({
        slug: v.string(),
        title: v.string(),
        date: v.date(),
      }),
    ),
    data,
  );

  return validated.map((d) => ({
    type: "md",
    ...d,
  }));
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
          {mdPosts.map((d) => (
            <li key={d.title}>
              <span className="flex gap-16 w-full items-center justify-between">
                <Link
                  prefetch={false}
                  href={`/posts/${d.slug}`}
                  className="text-sm hover:underline line-clamp-1"
                >
                  {d.title}
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
          {zennPosts.map((d) => (
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
