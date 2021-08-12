# react-sensible

A collection of sensible, reuseable hooks that cover a vareity of use-cases.

- [react-sensible](#react-sensible)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Components](#components)
      - [Drawer](#drawer)
      - [Modal](#modal)
    - [Hooks](#hooks)
      - [useOnClickOutside](#useonclickoutside)
      - [useIntersectionObserver](#useintersectionobserver)
      - [useMediaQuery](#usemediaquery)
      - [useDebounce](#usedebounce)
      - [useDisclosure](#usedisclosure)

## Installation

```
yarn add react-sensible framer-motion
```

## Usage

### Components

For components you will also need to import CSS

```tsx App.tsx
import "react-sensible/style.css";
```

#### Drawer

TODO

#### Modal

TODO

### Hooks

#### useOnClickOutside

- **Use cases:** Modal, Dropdown Menu, Context Menu

#### useIntersectionObserver

- **Use cases:** Pagination/Infinite scrolling, Virtualization

- **Usage:**

```tsx
import { useIntersectionObserver } from "react-sensible";

export default function Component() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(/** Fetch data */).then((res) => res.json);
    setData(data);
  };

  useIntersectionObserver({
    root: null,
    target: ref.current,
    onIntersect() {
      fetchData();
    },
  });

  return (
    <div>
      {data.map((item) => {
        return <div>{item}</div>;
      })}
      <div ref={ref}>Loading more</div>
    </div>
  );
}
```

#### useMediaQuery

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

#### useDebounce

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

#### useDisclosure

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
