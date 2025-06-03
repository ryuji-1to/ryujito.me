import { Spinner } from "@/share/components/spinner";

export default function Loading() {
  return (
    <div className="grid place-items-center mt-40">
      <Spinner className="size-24" />
    </div>
  );
}
