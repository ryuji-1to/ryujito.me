import { Text } from "@/share/components/text";
import matter from "gray-matter";
import { readFile, readdir } from "node:fs/promises";
import { RiGithubFill, RiTwitterXFill } from "react-icons/ri";
import { date, object, string, parse, array } from "valibot";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

const PostSchema = object({
  slug: string(),
  title: string(),
  date: date(),
});

async function getMdPosts() {
  const entries = await readdir("./public/", { withFileTypes: true });
  const posts = entries.filter((f) => f.isDirectory()).map((file) => file.name);
  const contents = await Promise.all(
    posts.map((post) => readFile(`./public/${post}/index.md`, "utf-8"))
  );
  const data = posts.map((slug, i) => {
    const content = contents[i];
    if (!content) {
      throw new Error("content not found");
    }
    const { data } = matter(content);
    return { slug, ...data };
  });
  return parse(array(PostSchema), data);
}

async function getAvatar() {
  const Schema = object({ avatar_url: string() });
  const res = await fetch("https://api.github.com/users/ryuji-1to");
  if (!res.ok) {
    return { avatar_url: "" };
  }
  const data = await res.json();
  return parse(Schema, data);
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
              <FiExternalLink />
            </div>
            <Text className="text-sm">Software Engineer at LY Corp.</Text>
          </Link>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/ryuji-1to"
            target="_blank"
            rel="noreferrer"
          >
            <RiGithubFill className="dark:text-gray-50" size={22} />
          </a>
          <a
            href="https://twitter.com/ryuji_program"
            target="_blank"
            rel="noreferrer"
          >
            <RiTwitterXFill className="dark:text-gray-50" size={22} />
          </a>
        </div>
      </div>
      <ul className="list-decimal ml-4 space-y-6 dark:marker:text-gray-50">
        {posts.map((d) => (
          <li key={d.slug}>
            <Link
              prefetch={false}
              href={`/posts/${d.slug}`}
              className="w-fit block"
            >
              <Text className="font-medium">{d.title}</Text>
              <Text className="text-[11px]">{d.date.toDateString()}</Text>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
