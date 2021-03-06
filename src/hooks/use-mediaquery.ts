import * as React from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const eventListener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    setMatches(!!mediaQueryList.matches);
    mediaQueryList.addEventListener("change", eventListener);
    () => mediaQueryList.removeEventListener("change", eventListener);
  }, [query]);

  return matches;
};

export default useMediaQuery;
