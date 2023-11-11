"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { THEME_COOKIE } from "config";

function ThemeProvider() {
  useEffect(() => {
    const classList = document.documentElement.classList;
    if (!classList.contains("dark") && !classList.contains("light")) {
      const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      document.documentElement.classList.add(theme);
      document.cookie = `${THEME_COOKIE}=${theme};path=/`;
    }
  }, []);

  return null;
}

export default ThemeProvider;
