import { initLinguiFromParams, type PageLangParam } from "@/app/init-lingui";
import { Markdown } from "@/share/components/markdown";
import { getFormattedMarkdown } from "@/share/lib";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ryuji Ito | About",
};

export default async function AboutPage(props: PageLangParam) {
  await initLinguiFromParams(props.params);
  const data = await getFormattedMarkdown("about.md");
  return <Markdown>{data.html}</Markdown>;
}
