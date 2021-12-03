import * as React from "react";

const useDebounce = <T extends unknown>(value: T, delay: number): T => {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value]);

  return debounced;
};

export default useDebounce;
