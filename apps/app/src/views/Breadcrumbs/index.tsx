"use client";
import { usePathname } from "next/navigation";
import { useMemo, Fragment } from "react";
import {
  HiUsers,
  HiCalendar,
  HiUserCircle,
  HiHome,
  HiChevronRight,
} from "react-icons/hi";
import { useTranslations } from "next-intl";
import Link from "next/link";
import clsx from "clsx";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations("header.breadcrumbs");

  const parts = useMemo(() => {
    return pathname
      .split("/")
      .filter((p) => Boolean(p))
      .reduce(
        (
          inc: Array<{
            active: boolean;
            path: string;
            token: string;
          }>,
          path,
          index,
          array,
        ) => {
          inc.push({
            active: index === array.length - 1,
            path: `/` + array.slice(0, index + 1).join("/"),
            token: path,
          });
          return inc;
        },
        [],
      );
  }, [pathname]);

  console.log("parts", parts);

  return (
    <div>
      <div className="container flex items-center px-6 py-4 mx-auto overflow-x-auto whitespace-nowrap">
        <a
          href="#"
          className="flex items-center justify-center text-gray-600 dark:text-gray-200 gap-x-2 hover:underline"
        >
          <HiHome size={20} />
          <span>{t("app")}</span>
        </a>

        {parts.map(({ path, token, active }) => (
          <Fragment key={path}>
            <span className="mx-2 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
              <HiChevronRight size={24} />
            </span>
            {active ? (
              <span className="text-blue-600 dark:text-blue-400 cursor-pointer">
                {t(token)}
              </span>
            ) : (
              <Link
                href={path}
                className={clsx(
                  "hover:underline text-gray-600 dark:text-gray-200",
                )}
              >
                {t(token)}
              </Link>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
