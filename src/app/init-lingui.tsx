import { setI18n } from "@lingui/react/server";
import { getI18nInstance, LocalesSchema, type SupportedLocales } from "./i18n";
import * as v from "valibot";
import { i18n } from "@lingui/core";

export type PageLangParam = {
  params: Promise<{ lang: string }>;
};

export function initLingui(lang: SupportedLocales) {
  const instance = getI18nInstance(lang);
  setI18n(instance);
  i18n.activate(lang);
  return instance;
}

export async function initLinguiFromParams(params: Promise<{ lang: string }>) {
  const result = v.safeParse(LocalesSchema, (await params).lang);
  const lang = result.success ? result.output : "en";
  return initLingui(lang);
}
