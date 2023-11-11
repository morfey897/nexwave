"use client";
import { EXTERNAL } from "@/constants/routes";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { HiMenuAlt3, HiX, HiCog, HiLogout } from "react-icons/hi";
import { TiWaves } from "react-icons/ti";
import ThemeSwithcer from "@/components/Theme";
import DropDown from "@/components/DropDown";
import NavItem from "@/components/NavItem";

function Header() {
  const t = useTranslations("header");
  const [menu, setMenu] = useState(false);

  const onToggleMenu = useCallback(() => {
    setMenu((menu) => !menu);
  }, []);

  const onCloseMenu = useCallback(() => {
    setMenu(false);
  }, []);

  return (
    <>
      <div className="relative w-full h-[80px]" />
      <nav className="fixed bg-white shadow dark:bg-gray-800 top-0 w-full z-30">
        <div className="container px-6 py-4 mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-900 dark:text-white"
              >
                <TiWaves size={48} />
              </Link>

              <div className="mx-10">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>

                  <input
                    type="text"
                    className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                    placeholder={t("search")}
                  />
                </div>
              </div>

              {/* <!-- Mobile menu button --> */}
              <div className="flex lg:hidden gap-2">
                <ThemeSwithcer />

                <button
                  onClick={onToggleMenu}
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  {!menu ? <HiMenuAlt3 size={24} /> : <HiX size={24} />}
                </button>
              </div>
            </div>

            <div
              onClick={onCloseMenu}
              className={clsx(
                "absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center",
                menu
                  ? "translate-x-0 opacity-100 shadow"
                  : "opacity-0 -translate-x-full",
              )}
            >
              <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                <a
                  href={EXTERNAL.site}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {t("links.cms")}
                </a>
                <a
                  href={EXTERNAL.site}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {t("links.site")}
                </a>
              </div>

              <div className="flex items-center mt-4 lg:mt-0 gap-4">
                <ThemeSwithcer className="hidden lg:block" />

                {/* Desktop version */}
                <DropDown
                  className="hidden lg:block"
                  direction={{ y: "bottom", x: "left" }}
                  Element={
                    <>
                      <button className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                        <Image
                          width={24}
                          height={24}
                          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                          className="object-cover w-full h-full"
                          alt="avatar"
                        />
                      </button>
                    </>
                  }
                >
                  <div className="px-2 py-4 flex flex-col">
                    <div className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 cursor-default">
                      <Image
                        className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                        src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
                        alt="jane avatar"
                      />
                      <div className="mx-1">
                        <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                          Jane Doe
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 break-words hyphens-auto">
                          janedoe@exampl.com
                        </p>
                      </div>
                    </div>

                    <hr className="border-gray-200 dark:border-gray-700" />
                    <NavItem Icon={HiCog} label={t("settings")} />
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <NavItem Icon={HiLogout} label={t("sign_out")} />
                  </div>
                </DropDown>

                {/* Mobile version */}
                <div className="flex flex-col w-full lg:hidden">
                  <hr className="border-gray-200 dark:border-gray-700 my-2" />

                  <div className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300">
                    <Image
                      className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                      src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
                      alt="jane avatar"
                    />
                    <div className="mx-1">
                      <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Jane Doe
                      </h1>
                      <p className="text-sm text-gray-500 dark:text-gray-400 break-words hyphens-auto">
                        janedoe@exampl.com
                      </p>
                    </div>
                  </div>

                  <NavItem
                    className="[&>span]:!block !flex-row"
                    Icon={HiCog}
                    label={t("settings")}
                  />
                  <NavItem
                    className="[&>span]:!block !flex-row"
                    Icon={HiLogout}
                    label={t("sign_out")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {menu && (
          <div
            onClick={onCloseMenu}
            className="inset-0 fixed bg-transparent backdrop-blur-sm"
          />
        )}
      </nav>
    </>
  );
}

export default Header;
