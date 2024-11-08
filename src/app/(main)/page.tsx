import { readFile, readdir } from "node:fs/promises";
import { Text } from "@/share/components/text";
import { cn } from "@/share/lib";
import matter from "gray-matter";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { RiGithubFill, RiTwitterXFill } from "react-icons/ri";
import * as v from "valibot";

const PostSchema = v.object({
  slug: v.string(),
  title: v.string(),
  date: v.date(),
  tag: v.optional(v.string()),
});

async function getMdPosts() {
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
  return v.parse(v.array(PostSchema), data);
}

const AvatarSchema = v.object({ avatar_url: v.string() });

async function getAvatar() {
  const res = await fetch("https://api.github.com/users/ryuji-1to");
  if (!res.ok) {
    return { avatar_url: "" };
  }
  const data = await res.json();
  return v.parse(AvatarSchema, data);
}

export default async function Home() {
  const [posts, avatar] = await Promise.all([getMdPosts(), getAvatar()]);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <Link href="/about">
            <div className="flex items-center gap-3 mb-1">
              <img
                src={avatar.avatar_url}
                width={28}
                height={28}
                alt="my avatar"
                className="rounded-full"
              />
              <Text as="h1" className="font-bold text-2xl">
                Ryuji Ito
              </Text>
              <FiExternalLink className="dark:text-gray-300" />
            </div>
            <Text className="text-sm pl-3">Software Engineer</Text>
          </Link>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/ryuji-1to"
            target="_blank"
            rel="noreferrer"
            aria-label="link for ryuji's github account"
          >
            <RiGithubFill className="dark:text-gray-50" size={22} />
          </a>
          <a
            href="https://twitter.com/ryuji_program"
            target="_blank"
            rel="noreferrer"
            aria-label="link for ryuji's x account"
          >
            <RiTwitterXFill className="dark:text-gray-50" size={22} />
          </a>
        </div>
      </div>
      <ul className="list-decimal ml-4 space-y-6 dark:marker:text-gray-50">
        {posts
          .sort((a, b) => (a.date < b.date ? 1 : -1))
          .map((d) => (
            <li key={d.slug}>
              <Link
                prefetch={false}
                href={`/posts/${d.slug}`}
                className="w-fit block"
              >
                <Text className="font-medium">{d.title}</Text>
                <Text className="text-[11px] space-x-2">
                  <span>{d.date.toDateString()}</span>
                  {d.tag && <Badge value={d.tag} />}
                </Text>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

const BadgeSchema = v.union([
  v.literal("Design"),
  v.literal("Dev"),
  v.literal("Other"),
]);

function Badge({ value }: { value: string }) {
  const parsed = v.safeParse(BadgeSchema, value);
  const badge = parsed.success ? parsed.output : "Other";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        badge === "Dev" &&
          "bg-blue-50 dark:bg-blue-400/10 ring-blue-700/10 dark:ring-blue-600/50 text-blue-700 dark:text-blue-500",
        badge === "Design" &&
          "bg-green-50 dark:bg-green-400/10 ring-green-700/10 dark:ring-green-600/50 text-green-700 dark:text-green-500",
        badge === "Other" &&
          "bg-indigo-50 dark:bg-indigo-400/10 ring-indigo-700/10 dark:ring-indigo-600/50 text-indigo-700 dark:text-indigo-500",
      )}
    >
      {badge === "Design"
        ? "🎨"
        : badge === "Dev"
          ? "💻"
          : badge === "Other"
            ? "🦊"
            : null}{" "}
      {badge}
    </span>
  );
}
