import { Header } from "./header";
import { TimeLine } from "./timeline";

export default function Home() {
  return (
    <div className="space-y-12">
      <Header />
      <TimeLine />
    </div>
  );
}
