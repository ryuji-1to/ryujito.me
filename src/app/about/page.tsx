import { getFormattedMarkdown } from "@/share/lib";
import { Markdown } from "@/share/components/markdown";

export default async function AboutPage() {
  const data = await getFormattedMarkdown("about.md");
  return <Markdown>{data.value}</Markdown>;
}
