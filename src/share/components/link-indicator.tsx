import { useLinkStatus } from "next/link";

export function LinkIndicator() {
  const { pending } = useLinkStatus();
  return pending ? <div aria-label="loading">loading...</div> : null;
}
