import type { Metadata } from "next";
import { Posts } from "./posts";
import { initLinguiFromParams, type PageLangParam } from "@/app/init-lingui";

export const metadata: Metadata = {
  title: "Ryuji Ito | Posts",
};

export default async function Page(props: PageLangParam) {
  await initLinguiFromParams(props.params);
  return <Posts />;
}
