import { Profile } from "./profile";
import { TimeLine } from "./timeline";

export default function Home() {
  return (
    <div className="space-y-40">
      <Profile />
      <TimeLine />
    </div>
  );
}
