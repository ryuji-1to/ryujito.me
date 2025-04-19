import { initLinguiFromParams, type PageLangParam } from "@/app/init-lingui";
import { Profile } from "./profile";
import { TimeLine } from "./timeline";

export default async function Home(props: PageLangParam) {
  await initLinguiFromParams(props.params);

  return (
    <div className="space-y-64">
      <Profile />
      <TimeLine />
    </div>
  );
}
