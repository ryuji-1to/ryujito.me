import { z } from "astro/zod";

const responseSchema = z.object({
  articles: z.array(
    z.object({
      title: z.string(),
      path: z.string().startsWith("/"),
      published_at: z.coerce.date(),
    }),
  ),
});

export async function getZennPosts() {
  try {
    const response = await fetch(
      "https://zenn.dev/api/articles?username=ryuji_ito",
      {
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!response.ok) return [];

    const { articles } = responseSchema.parse(await response.json());
    return articles.map((article) => ({
      title: article.title,
      href: `https://zenn.dev${article.path}`,
      date: article.published_at,
      external: true,
    }));
  } catch {
    return [];
  }
}
