import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import { Err, Ok, type Result } from "rustlike-ts";
import * as v from "valibot";
import ExternalLinkIcon from "@/assets/external-link.svg";
import { NavigationIndicator } from "@/share/components/navigation-indicator";
import { Spinner } from "@/share/components/spinner";
import { UNEXPECTED_ERROR, VALIDATION_ERROR } from "@/share/constants";
import { formatDate } from "@/share/utils";

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
  // published: boolean;
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
      return null;
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
        published: v.boolean(),
      }),
    ),
    data,
  );

  if (!validated.success) {
    return Err(VALIDATION_ERROR);
  }

  return Ok(
    validated.output
      .toSorted((a, b) => (a.date > b.date ? -1 : 1))
      .filter((d) => d.published)
      .map((d) => ({
        type: "md",
        ...d,
      })),
  );
}

type Post = MdPost | ZennPost;

export async function Posts() {
  const [mdPosts, zennPosts] = await Promise.all([
    getMdPosts(),
    getZennPosts(),
  ]);

  const allPosts: Post[] = [
    ...mdPosts.unwrapOr([]),
    ...zennPosts.unwrapOr([]),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const labelId = "all-posts";

  return (
    <div className="space-y-40">
      <section aria-labelledby={labelId}>
        <h2 id={labelId} className="mb-16 font-medium">
          記事一覧
        </h2>
        <ul className="ml-4 space-y-16">
          {allPosts.map((d) => (
            <li key={d.type === "md" ? d.slug : d.path}>
              <span className="flex gap-16 w-full items-center justify-between">
                {d.type === "md" ? (
                  d.published && (
                    <Link
                      href={`/posts/${d.slug}`}
                      className="text-sm hover:underline"
                    >
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
                  )
                ) : (
                  <a
                    href={`https://zenn.dev/${d.path}`}
                    className="flex items-center text-sm hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {d.title}
                    <ExternalLinkIcon
                      className="size-16 inline-block ml-4 dark:fill-dark-gray-12"
                      aria-label="(別タブで開きます)"
                    />
                  </a>
                )}
                <time
                  className="text-xs text-sub-text font-mono dark:text-dark-sub-text"
                  dateTime={d.date.toLocaleDateString()}
                >
                  {formatDate(d.date)}
                </time>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
