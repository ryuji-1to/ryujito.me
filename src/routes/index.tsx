import { createFileRoute } from "@tanstack/react-router";
import { Profile } from "@/components/profile";
import { TimeLine } from "@/components/timeline";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="space-y-40">
      <Profile />
      <TimeLine />
    </div>
  );
}
