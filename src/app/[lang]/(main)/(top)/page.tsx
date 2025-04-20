import { initLinguiFromParams, type PageLangParam } from "@/app/init-lingui";
import { Profile } from "./profile";
import { TimeLine } from "./timeline";

export default async function Home(props: PageLangParam) {
  const i18n = await initLinguiFromParams(props.params);

  return (
    <div className="space-y-64">
      <Profile />
      <TimeLine i18n={i18n} />
    </div>
  );
}
