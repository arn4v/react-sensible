import * as React from "react";

type IsOpen = boolean;
type OnOpen = () => void;
type OnClose = () => void;
type OnToggle = () => void;

type OnDisclosureReturn = [IsOpen, OnOpen, OnClose, OnToggle] & {
  isOpen: IsOpen;
  onOpen: OnOpen;
  onClose: OnClose;
  onToggle: OnToggle;
};

const useDisclosure = (initialState: boolean = false): OnDisclosureReturn => {
  const [isOpen, setOpen] = React.useState<boolean>(initialState);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onToggle = () => setOpen((prev) => !prev);

  const result = [isOpen, onOpen, onClose, onToggle] as OnDisclosureReturn;

  // Support object destructuring
  result.isOpen = result[0];
  result.onOpen = result[1];
  result.onClose = result[2];
  result.onToggle = result[3];

  return result;
};

export default useDisclosure;
