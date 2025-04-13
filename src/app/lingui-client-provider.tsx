"use client";

import { I18nProvider } from "@lingui/react";
import { type Messages, setupI18n } from "@lingui/core";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export function LinguiClientProvider(props: Props) {
  const [i18n] = useState(() => {
    return setupI18n({
      locale: props.initialLocale,
      messages: { [props.initialLocale]: props.initialMessages },
    });
  });
  return <I18nProvider i18n={i18n}>{props.children}</I18nProvider>;
}
