import type { Metadata } from "next";
import { Posts } from "./posts";

export const metadata: Metadata = {
  title: "Ryuji Ito | Posts",
};

export default function Page() {
  return <Posts />;
}
