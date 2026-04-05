import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Err, Ok, type Result } from "rustlike-ts";
import * as v from "valibot";
import ExternalLinkIcon from "@/assets/external-link.svg?url";
import { UNEXPECTED_ERROR, VALIDATION_ERROR } from "@/share/constants";
import { resolvePublicDir } from "@/share/public-dir.server";
import { formatDate } from "@/share/utils";

type ZennPost = {
  type: "zenn";
  path: string;
  title?: string;
  date: string;
};

async function getZennPosts(): Promise<
  Result<ZennPost[], typeof UNEXPECTED_ERROR | typeof VALIDATION_ERROR>
> {
  try {
    const res = await fetch("https://zenn.dev/api/articles?username=ryuji_ito");

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
        date: new Date(d.published_at).toISOString(),
      })),
    );
  } catch {
    return Err(UNEXPECTED_ERROR);
  }
}

type MdPost = {
  type: "md";
  slug: string;
  title: string;
  date: string;
  published: boolean;
};

async function getMdPosts(): Promise<
  Result<MdPost[], typeof VALIDATION_ERROR>
> {
  const [{ readdir, readFile }, matterModule] = await Promise.all([
    import("node:fs/promises"),
    import("gray-matter"),
  ]);
  const matter = matterModule.default;
  const dir = await resolvePublicDir();
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
        date: d.date.toISOString(),
      })),
  );
}

type Post = MdPost | ZennPost;

const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  const [mdPosts, zennPosts] = await Promise.all([
    getMdPosts(),
    getZennPosts(),
  ]);
  const allPosts: Post[] = [
    ...mdPosts.unwrapOr([]),
    ...zennPosts.unwrapOr([]),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return allPosts;
});

export const Route = createFileRoute("/posts/")({
  head: () => ({
    meta: [{ title: "ブログ | Ryuji Ito" }],
  }),
  loader: () => getPosts(),
  component: PostsPage,
});

function PostsPage() {
  const allPosts = Route.useLoaderData();
  const labelId = "all-posts";

  return (
    <div className="space-y-40">
      <section aria-labelledby={labelId}>
        <h2 id={labelId} className="mb-16 font-semibold">
          記事一覧
        </h2>
        <ul className="ml-4 space-y-16 list-custom">
          {allPosts.map((d) => (
            <li key={d.type === "md" ? d.slug : d.path}>
              <span className="flex gap-16 w-full items-center justify-between">
                {d.type === "md" ? (
                  d.published && (
                    <Link
                      to="/posts/$slug"
                      params={{ slug: d.slug }}
                      className="text-sm hover:underline"
                    >
                      {" "}
                      {d.title}
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
                    <img
                      width={16}
                      height={16}
                      src={ExternalLinkIcon}
                      className="size-16 inline-block ml-4"
                      alt="(別タブで開きます)"
                    />
                  </a>
                )}
                <time
                  className="text-xs text-sub-text font-mono dark:text-dark-sub-text"
                  dateTime={new Date(d.date).toLocaleDateString()}
                >
                  {formatDate(new Date(d.date))}
                </time>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
