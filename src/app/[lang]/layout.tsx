import type { Metadata } from "next";
import "../globals.css";
import { LinguiClientProvider } from "../lingui-client-provider";
import { initLinguiFromParams } from "../init-lingui";
import { allMessages } from "../i18n";

type Props = {
  params: Promise<{
    lang: string;
  }>;
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Ryuji Ito",
};

export default async function RootLayout(props: Props) {
  const { lang } = await initLinguiFromParams(props.params);

  return (
    <html
      lang={lang}
      className="font-sans antialiased dark:bg-black dark:text-dark-gray-12 bg-white text-gray-12  print:bg-white"
    >
      <head>
        <meta name="description" content="Personal Website by Ryuji Ito" />
        <link href="/favicon.png" rel="icon" />
      </head>
      <body>
        <LinguiClientProvider
          initialLocale={lang}
          initialMessages={allMessages[lang]}
        >
          {props.children}
        </LinguiClientProvider>
      </body>
    </html>
  );
}
