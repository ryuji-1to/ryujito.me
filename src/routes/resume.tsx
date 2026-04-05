import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Markdown } from "@/share/components/markdown";

const getResume = createServerFn({ method: "GET" }).handler(async () => {
  const { getFormattedMarkdown } = await import("@/share/lib.server");
  const data = await getFormattedMarkdown("resume.md");
  return { html: data.html };
});

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume | Ryuji Ito" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  loader: () => getResume(),
  component: Resume,
});

function Resume() {
  const data = Route.useLoaderData();
  return <Markdown>{data.html}</Markdown>;
}
