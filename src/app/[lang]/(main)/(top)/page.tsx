import { initLingui, type PageLangParam } from "@/app/init-lingui";
import { Profile } from "./profile";
import { TimeLine } from "./timeline";
import * as v from "valibot";
import { LocalesSchema } from "@/app/i18n";

export default async function Home(props: PageLangParam) {
  const result = v.safeParse(LocalesSchema, (await props.params).lang);
  const lang = result.success ? result.output : "en";
  initLingui(lang);

  return (
    <div className="space-y-64">
      <Profile />
      <TimeLine />
    </div>
  );
}
