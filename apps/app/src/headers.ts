import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, THEME_COOKIE } from "config";

export const getLocale = (): string =>
  cookies().get(LOCALE_COOKIE)?.value || DEFAULT_LOCALE;

export const getTheme = () => cookies().get(THEME_COOKIE)?.value;

export const getPathname = (): string =>
  headers().get("X-Next-Pathname") || "/";
