"use client";

import { useLinkStatus } from "next/link";

type Props = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};

export function NavigationIndicator(props: Props) {
  const { pending } = useLinkStatus();
  return (
    <>
      <span className="sr-only" aria-live="polite">
        {pending ? "ローディング中" : null}
      </span>
      {pending ? props.fallback : props.children}
    </>
  );
}
