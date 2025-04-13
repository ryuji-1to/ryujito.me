import "server-only";
import linguiConfig from "../../lingui.config";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import * as v from "valibot";

const { locales } = linguiConfig;

export const LocalesSchema = v.union([v.literal("ja"), v.literal("en")]);

export type SupportedLocales = v.InferOutput<typeof LocalesSchema>;

async function loadCatalog(locale: SupportedLocales) {
  const { messages } = (await import(`../locales/${locale}.po`)) as Messages;
  return {
    [locale]: messages,
  };
}

const catalogs = await Promise.all(
  locales.map((locale) => loadCatalog(locale as SupportedLocales)),
);

export const allMessages = catalogs.reduce(
  (acc, oneCatalog) => {
    return { ...(acc || {}), ...oneCatalog };
  },
  {} as { [K in SupportedLocales]: Messages },
);

type AllI18nInstances = { [K in SupportedLocales]: I18n };

export const allI18nInstances = locales.reduce((acc, locale) => {
  const messages = allMessages[locale as SupportedLocales] ?? {};
  const i18n = setupI18n({
    locale,
    messages: { [locale]: messages },
  });
  return { ...(acc || {}), [locale]: i18n };
}, {}) as AllI18nInstances;

export const getI18nInstance = (locale: SupportedLocales): I18n => {
  if (!allI18nInstances[locale]) {
    console.warn(`No i18n instance found for locale "${locale}"`);
  }
  return (allI18nInstances[locale] || allI18nInstances.ja) as I18n;
};
