import { setI18n } from "@lingui/react/server";
import { getI18nInstance, type SupportedLocales } from "./i18n";
import { i18n } from "@lingui/core";

export type PageLangParam = {
  params: Promise<{ lang: string }>;
};

export function initLingui(lang: SupportedLocales) {
  const instance = getI18nInstance(lang);
  setI18n(instance);
  i18n.activate(instance.locale);
  return instance;
}
