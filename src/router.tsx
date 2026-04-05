import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { Spinner } from "@/share/components/spinner";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPendingComponent: RoutePending,
    defaultPendingMs: 0,
    defaultPendingMinMs: 200,
  });
}

function RoutePending() {
  return (
    <div className="py-40 flex items-center justify-center">
      <Spinner className="w-24 h-24" />
    </div>
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: Awaited<ReturnType<typeof getRouter>>;
  }
}
