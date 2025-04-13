import { setI18n } from "@lingui/react/server";
import { getI18nInstance, type SupportedLocales } from "./i18n";

export type PageLangParam = {
  params: Promise<{ lang: string }>;
};

export function initLingui(lang: SupportedLocales) {
  const i18n = getI18nInstance(lang);
  setI18n(i18n);
  return i18n;
}
