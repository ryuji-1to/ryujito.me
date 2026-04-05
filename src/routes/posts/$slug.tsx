import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";
import { Markdown } from "@/share/components/markdown";
import { formatDate } from "@/share/utils";

const schema = v.object({
  title: v.string(),
  date: v.date(),
  html: v.string(),
  description: v.optional(v.string()),
});

const getPostBySlug = createServerFn({ method: "GET" }).handler(
  async (ctx: { data?: { slug?: string } }) => {
    const slug = ctx.data?.slug;
    if (!slug) {
      return null;
    }

    const [{ readFile }, matterModule, markdownModule] = await Promise.all([
      import("node:fs/promises"),
      import("gray-matter"),
      import("@/share/lib.server"),
    ]);
    const matter = matterModule.default;
    const { markdownToHtml } = markdownModule;
    const filename = `./public/${slug}/index.md`;

    try {
      const { content, data: frontmatter } = matter(
        await readFile(filename, "utf8"),
      );
      const html = await markdownToHtml(content);
      const validated = v.safeParse(schema, { html, ...frontmatter });

      if (!validated.success) {
        return null;
      }

      return {
        ...validated.output,
        date: validated.output.date.toISOString(),
      };
    } catch {
      return null;
    }
  },
);

export const Route = createFileRoute("/posts/$slug")({
  loader: async ({ params }) => {
    const data = await getPostBySlug({ data: { slug: params.slug } });

    if (!data) {
      throw notFound();
    }

    return data;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.title} | Ryuji Ito` },
      { name: "description", content: loaderData.description || "" },
    ],
  }),
  component: PostPage,
});

function PostPage() {
  const data = Route.useLoaderData();
  const date = new Date(data.date);

  return (
    <article>
      <header className="my-40 pb-8 space-y-40 border-b border-b-gray-4 dark:border-b-dark-gray-4">
        <div className="space-y-24">
          <h1 className="text-xl text-center text-balance">{data.title}</h1>
          <p className="text-xs w-fit ml-auto text-sub-text dark:text-dark-sub-text">
            <time dateTime={date.toLocaleDateString()}>{formatDate(date)}</time>
          </p>
        </div>
      </header>
      <Markdown>{data.html}</Markdown>
    </article>
  );
}
