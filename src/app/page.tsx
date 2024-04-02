import { Text } from "@/share/components/text";
import matter from "gray-matter";
import { readFile, readdir } from "fs/promises";
import { RiGithubFill, RiTwitterXFill } from "react-icons/ri";
import { date, object, string, parse, array } from "valibot";
import Link from "next/link";

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

export default async function Home() {
  const data = await getMdPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <Link href="/about">
            <Text as="h1" className="font-bold text-2xl">
              Ryuji Ito
            </Text>
            <Text className="text-sm">Software Engineer at LY Corp.</Text>
          </Link>
        </div>
        <div className="flex gap-4">
          <a href="" target="_blank">
            <RiGithubFill className="dark:text-gray-50" size={22} />
          </a>
          <a href="" target="_blank">
            <RiTwitterXFill className="dark:text-gray-50" size={22} />
          </a>
        </div>
      </div>
      <ul className="list-decimal ml-4 space-y-6 dark:marker:text-gray-50">
        {data.map((d) => (
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
