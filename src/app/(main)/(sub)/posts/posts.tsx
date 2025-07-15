import * as v from "valibot";
import { Ok, Err, type Result } from "rustlike-ts";
import { readFile, readdir } from "node:fs/promises";
import matter from "gray-matter";
import Link from "next/link";
import ExternalLinkIcon from "@/assets/external-link.svg";
import path from "node:path";
import { NavigationIndicator } from "@/share/components/navigation-indicator";
import { UNEXPECTED_ERROR, VALIDATION_ERROR } from "@/share/constants";
import { Spinner } from "@/share/components/spinner";

type ZennPost = {
  type: "zenn";
  path: string;
  title?: string;
  date: Date;
};

async function getZennPosts(): Promise<
  Result<ZennPost[], typeof UNEXPECTED_ERROR | typeof VALIDATION_ERROR>
> {
  const res = await fetch("https://zenn.dev/api/articles?username=ryuji_ito", {
    next: {
      revalidate: 24 * 60 * 10,
    },
  });

  if (!res.ok) {
    return Err(UNEXPECTED_ERROR);
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
    return Err(VALIDATION_ERROR);
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

async function getMdPosts(): Promise<
  Result<MdPost[], typeof VALIDATION_ERROR>
> {
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
    return Err(VALIDATION_ERROR);
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
        <ul className="ml-16 space-y-8">
          {mdPosts.unwrapOr([]).map((d) => (
            <li key={d.title}>
              <span className="flex gap-16 w-full items-center justify-between">
                <Link href={`/posts/${d.slug}`} className="text-sm underline">
                  <NavigationIndicator
                    fallback={
                      <span className="text-sub-text dark:text-dark-sub-text space-x-4">
                        {d.title}
                        &nbsp;
                        <Spinner className="inline-block size-16 ml-4" />
                      </span>
                    }
                  >
                    {d.title}
                  </NavigationIndicator>
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="zenn-posts">
        <h2 id="zenn-posts" className="mb-8 font-medium">
          Zenn
        </h2>
        <ul className="ml-16 space-y-8">
          {zennPosts.unwrapOr([]).map((d) => (
            <li key={d.title}>
              <span className="flex gap-16 w-full items-center justify-between">
                <a
                  href={`https://zenn.dev/${d.path}`}
                  className="text-sm underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {d.title}
                  <ExternalLinkIcon
                    className="size-16 inline-block ml-4 dark:fill-dark-gray-12"
                    aria-label="(別タブで開きます)"
                  />
                </a>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
