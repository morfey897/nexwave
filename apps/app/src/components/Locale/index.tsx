"use client";
import { useLocale, useTranslations } from "next-intl";
import { LOCALES, LOCALE_COOKIE } from "config";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import NavItem from "../NavItem";
import DropDown from "@/components/DropDown";
import CurrentLocale, { ICONS } from "./Icons";

function LocaleSwitcher() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();

  const onChangeLocale = useCallback(
    (newLocale: string) => {
      document.cookie = `${LOCALE_COOKIE}=${newLocale};path=/`;
      router.refresh();
    },
    [router],
  );

  return (
    <DropDown
      direction={{ y: "top", x: "right" }}
      className="inline-block m-auto md:m-0"
      Element={
        <button className="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
          <CurrentLocale
            locale={locale}
            className="w-8 h-8 rounded-full"
            fill="currentColor"
          />
        </button>
      }
    >
      <div className="px-2 py-4 flex flex-col">
        {LOCALES.map((locale) => (
          <NavItem
            key={locale}
            className={"[&>span]:!block [&>span]:text-sm [&>svg]:rounded-full"}
            onClick={() => onChangeLocale(locale)}
            Icon={ICONS[locale]}
            label={t(`i18n.${locale}.title`)}
          />
        ))}
      </div>
    </DropDown>
  );
}

export default LocaleSwitcher;
