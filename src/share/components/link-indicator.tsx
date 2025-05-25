"use client";

import { useLinkStatus } from "next/link";

type Props = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};

export function LinkIndicator(props: Props) {
  const { pending } = useLinkStatus();
  return pending ? (
    <div aria-label="loading">{props.fallback}</div>
  ) : (
    props.children
  );
}
