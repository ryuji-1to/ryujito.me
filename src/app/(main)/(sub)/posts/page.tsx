import type { Metadata } from "next";
import { Posts } from "./posts";
// import type { PageLangParam } from "@/app/init-lingui";

export const metadata: Metadata = {
  title: "Posts | Ryuji Ito",
};

export default function Page() {
  // await initLinguiFromParams(props.params);
  return <Posts />;
}
