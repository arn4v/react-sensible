import * as React from "react";

const useIsAtTop = () => {
  const [isAtTop, setAtTop] = React.useState(true);
  React.useEffect(() => {
    const onScroll = (e: Event) => {
      if (window.pageYOffset > 0) {
        setAtTop(false);
      } else {
        setAtTop(true);
      }
    };

    window.addEventListener("scroll", onScroll, false);
    return () => window.removeEventListener("scroll", onScroll, false);
  }, []);

  return isAtTop;
};

export default useIsAtTop;
