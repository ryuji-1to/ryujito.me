import type { Metadata } from "next";
import "./globals.css";
import { RouteChangeFocus } from "./route-change-focus";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Ryuji Ito",
};

export default function RootLayout(props: Props) {
  return (
    <RouteChangeFocus>
      <html
        lang="ja"
        className="font-ud antialiased dark:bg-dark-main-bg dark:text-dark-main-text bg-main-bg text-main-text  print:bg-white"
      >
        <head>
          <meta name="description" content="Personal Website by Ryuji Ito" />
          <meta name="author" content="Ryuji Ito" />
          <link href="/favicon.png" rel="icon" />
          <link rel="canonical" href="https://ryujito.me" />
        </head>
        <body id="body" tabIndex={-1}>
          {props.children}
        </body>
      </html>
    </RouteChangeFocus>
  );
}
