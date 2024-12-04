import * as v from "valibot";
import { readFile, readdir } from "node:fs/promises";
import matter from "gray-matter";
import Link from "next/link";
import { cn } from "@/share/lib";
import { FiExternalLink } from "react-icons/fi";

type ZennPost = {
  type: "zenn";
  path: string;
  title?: string;
  date: Date;
  tag: "Zenn";
};

async function getZennPosts(): Promise<ZennPost[]> {
  const res = await fetch("https://zenn.dev/api/articles?username=ryuji_ito", {
    next: { revalidate: 60 * 60 * 24 },
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
  return validated.map((d) => ({
    type: "zenn",
    path: d.path,
    title: d.title,
    date: new Date(d.published_at),
    tag: "Zenn",
  }));
}

type MdPosts = {
  type: "md";
  slug: string;
  title: string;
  date: Date;
  tag?: string;
};

async function getMdPosts(): Promise<MdPosts[]> {
  const entries = await readdir("./public/", { withFileTypes: true });
  const posts = entries.filter((f) => f.isDirectory()).map((file) => file.name);
  const contents = await Promise.all(
    posts.map((post) => readFile(`./public/${post}/index.md`, "utf-8")),
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
        tag: v.optional(v.string()),
      }),
    ),
    data,
  );
  return validated.map((d) => ({
    type: "md",
    ...d,
  }));
}

async function getPosts() {
  const [mdPosts, zennPosts] = await Promise.all([
    getMdPosts(),
    getZennPosts(),
  ]);
  return [...mdPosts, ...zennPosts].toSorted((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
}

export async function Posts() {
  const posts = await getPosts();

  return (
    <ul className="list-decimal ml-4 space-y-6 dark:marker:text-gray-50">
      {posts
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .map((d) =>
          d.type === "md" ? (
            <li key={d.title}>
              <Link
                prefetch={false}
                href={`/posts/${d.slug}`}
                className="w-fit block"
              >
                <div className="font-medium">{d.title}</div>
                <span className="text-[11px] space-x-2">
                  <span>{d.date.toDateString()}</span>
                  {d.tag && <Badge value={d.tag} />}
                </span>
              </Link>
            </li>
          ) : (
            <li key={d.title}>
              <a
                href={`https://zenn.dev/${d.path}`}
                className="w-fit block"
                target="_blank"
                rel="noreferrer"
              >
                <span className="font-medium flex items-center gap-2">
                  {d.title} <FiExternalLink size={12} />
                </span>
                <span className="text-[11px] space-x-2">
                  <span>{d.date.toDateString()}</span>
                  {d.tag && <Badge value={d.tag} />}
                </span>
              </a>
            </li>
          ),
        )}
    </ul>
  );
}

const BadgeSchema = v.union([
  v.literal("Design"),
  v.literal("Dev"),
  v.literal("Other"),
  v.literal("Zenn"),
]);

function Badge({ value }: { value: string }) {
  const parsed = v.safeParse(BadgeSchema, value);
  const badge = parsed.success ? parsed.output : "Other";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        badge === "Dev" &&
          "bg-indigo-50 dark:bg-indigo-400/10 ring-indigo-700/10 dark:ring-0 text-indigo-700 dark:text-indigo-500",
        badge === "Design" &&
          "bg-green-50 dark:bg-green-400/10 ring-green-700/10 dark:ring-0  text-green-700 dark:text-green-500",
        badge === "Other" &&
          "bg-orange-50 dark:bg-orange-400/10 ring-orange-700/10 dark:ring-0 text-orange-700 dark:text-orange-500",
        badge === "Zenn" &&
          "bg-blue-50 dark:bg-blue-400/10 ring-blue-700/10 dark:ring-0 text-blue-700 dark:text-blue-500",
      )}
    >
      {badge}
    </span>
  );
}
