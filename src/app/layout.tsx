import { Geist } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/share/lib";
import { LinguiClientProvider } from "./lingui-client-provider";
import { initLingui } from "./init-lingui";
import { allMessages, LocalesSchema } from "./i18n";
import * as v from "valibot";

type Props = {
  params: Promise<{
    lang: string;
  }>;
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Ryuji Ito",
};

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "900"],
  style: ["normal"],
});

export default async function RootLayout(props: Props) {
  const result = v.safeParse(LocalesSchema, (await props.params).lang);
  const lang = result.success ? result.output : "en";
  initLingui(lang);

  return (
    <html
      lang={lang}
      className={cn(
        "antialiased dark:bg-black dark:text-dark-gray-12 bg-white text-gray-12  print:bg-white",
        geist.className,
      )}
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
