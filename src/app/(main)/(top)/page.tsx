import { Profile } from "./profile";
import { TimeLine } from "./timeline";

export default function Home() {
  return (
    <div className="space-y-12">
      <Profile />
      <TimeLine />
    </div>
  );
}
