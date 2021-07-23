# react-sensible

A collection of sensible, reuseable hooks that cover a vareity of use-cases.

- [react-sensible](#react-sensible)
  - [useOnClickOutside](#useonclickoutside)
  - [useIntersectionObserver](#useintersectionobserver)
  - [useMediaQuery](#usemediaquery)
  - [useBreakpoints](#usebreakpoints)
  - [useDebounce](#usedebounce)
  - [useDisclosure](#usedisclosure)

## useOnClickOutside

- **Use cases:** Modal, Dropdown Menu, Context Menu

## useIntersectionObserver

- **Use cases:** Pagination/Infinite scrolling, Virtualization

## useMediaQuery

- **Use cases:** Programmatic responsive layouts
- **Usage:**

```tsx
import { useMediaQuery } from "react-sensible";

const Component = () => {
  const isLarge = useMediaQuery("(min-width: 1024px)");

  return isLarge ? (
    /** Laptop UI */
    <div></div>
  ) : (
    /** Mobile UI */
    <div></div>
  );
};
```

## useBreakpoints

- **Use cases:** Quick responsive layout using TailwindCSS breakpoints.

## useDebounce

- **Use cases:** API Calls on input value change
- **Usage:**

```tsx
import * as React from "react";
import { useDebounce } from "react-sensible";

export default function Component() {
  const [value, setValue] = React.useState<string>("");
  const debouncedValue = useDebounce(value);

  React.useEffect(() => {
    // Run side-effect on debounced value (like an api call)
  }, [debouncedValue]);

  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

## useDisclosure

- **Credits:** Chakra UI

- **Use cases:** Accordion, Modal, Dropdown Menu

- **Usage:**

```tsx
import useDisclosure from "~/hooks/use-disclosure";

const Component = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <button onClick={onOpen}>Open menu</button>
      <button onClick={onClose}>Close menu</button>
      {isOpen ? <div className="menu"></div> : null}
    </div>
  );
};
```
