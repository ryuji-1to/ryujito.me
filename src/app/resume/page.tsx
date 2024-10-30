import { Markdown } from "@/share/components/markdown";
import { getFormattedMarkdown } from "@/share/lib";

export default async function Resume() {
  const data = await getFormattedMarkdown("resume.md");
  return <Markdown>{data.value}</Markdown>;
}
