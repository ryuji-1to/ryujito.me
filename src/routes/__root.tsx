import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ryuji Ito" },
      { name: "description", content: "Personal Website by Ryuji Ito" },
      { name: "author", content: "Ryuji Ito" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png" },
      { rel: "canonical", href: "https://ryujito.me" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 max-w-2xl w-full mx-auto px-24 py-40 sm:px-40">
          <Outlet />
        </main>
        <Footer />
      </div>
    </RootDocument>
  );
}

function RootDocument(props: { children: ReactNode }) {
  return (
    <html
      lang="ja"
      className="font-ud antialiased dark:bg-dark-main-bg dark:text-dark-main-text bg-main-bg text-main-text print:bg-white"
    >
      <head>
        <HeadContent />
      </head>
      <body id="body" tabIndex={-1}>
        {props.children}
        <Scripts />
      </body>
    </html>
  );
}
