"use client"; // Error components must be Client Components

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { BiSolidErrorAlt } from "react-icons/bi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("page_error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <section className="bg-white dark:bg-gray-900 ">
        <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
              <BiSolidErrorAlt size={32} />
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              {t("headline")}
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              {t("subheadlines")}
            </p>

            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <button
                onClick={reset}
                className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              >
                {t("reset")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
