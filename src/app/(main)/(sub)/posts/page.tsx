import type { Metadata } from "next";
import { Posts } from "./posts";

export const metadata: Metadata = {
  title: "ブログ | Ryuji Ito",
};

export default function Page() {
  return <Posts />;
}
