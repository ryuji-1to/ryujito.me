import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Markdown } from "@/share/components/markdown";

const getAbout = createServerFn({ method: "GET" }).handler(async () => {
  const { getFormattedMarkdown } = await import("@/share/lib.server");
  const data = await getFormattedMarkdown("about.md");
  return { html: data.html };
});

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "自己紹介 | Ryuji Ito" }],
  }),
  loader: () => getAbout(),
  component: AboutPage,
});

function AboutPage() {
  const data = Route.useLoaderData();
  return <Markdown>{data.html}</Markdown>;
}
