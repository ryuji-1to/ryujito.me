"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export function RouteChangeFocus(props: Props) {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // TODO: mainにあてる
    const body = document.getElementById("body");
    body?.focus();
  }, [pathname]);

  return <>{props.children}</>;
}
