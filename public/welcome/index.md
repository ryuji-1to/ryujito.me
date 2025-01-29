---
title: "Welcome"
date: 2024-06-01
tag: "Other"
---

## 技術スタック紹介

---

以下の技術を使用しています

--browser:start--

- **Next.js**
- **Tailwind CSS**
- **Biome**
- **Valibot**
- **Shiki**
- **remark**

--browser:end--

`public` 内の md ファイルに記事を書き、slug ページで ↓ のように取得し表示しています

```tsx
const Schema = v.object({
  date: v.date(),
  value: v.string(),
});

async function getPostBySlug(slug: string) {
  const filename = `./public/${slug}/index.md`;
  const { content, data } = matter(await readFile(filename, "utf8"));
  const file = await formatMarkdown(content);
  return v.parse(Schema, { content, ...file, ...data });
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const data = await getPostBySlug(params.slug);

  return (
    <ArticleLayout
      renderHeaderRight={() => {
        return (
          <Text className="font-semibold text-xs">
            {data.date.toDateString()}
          </Text>
        );
      }}
    >
      <Markdown>{data.value}</Markdown>
    </ArticleLayout>
  );
}
```

[GitHub リポジトリ - ryujito.me](https://github.com/ryuji-1to/ryujito.me)
