// import { initLinguiFromParams, type PageLangParam } from "@/app/init-lingui";
import { Profile } from "./profile";
import { TimeLine } from "./timeline";

export default function Home() {
  // await initLinguiFromParams(props.params);
  return (
    <div className="space-y-40">
      <Profile />
      <TimeLine />
    </div>
  );
}
