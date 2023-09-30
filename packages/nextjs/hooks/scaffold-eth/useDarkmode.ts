import { useEffect, useState } from "react";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

interface UseDarkModeOutput {
  isDarkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

export function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [isFirstrender, setIsFirstRender] = useState(true);
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    "usehooks-ts-dark-mode",
    defaultValue ?? isDarkOS ?? false,
  );

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  // Update darkMode if os prefers changes
  useEffect(() => {
    if (!isFirstrender) {
      setDarkMode(isDarkOS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkOS]);

  return {
    isDarkMode,
    toggle: () => setDarkMode(prev => !prev),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
  };
}
