import { Portal, PortalProps } from "@reach/portal";
import clsx from "clsx";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";
import { useFilterChildren } from "../hooks";
import { SComponent } from "../types";

export interface ModalProps  {
  portalProps?: Omit<PortalProps, "children">;
  containerProps?: {
    className?: string;
  };
  overlayProps?: HTMLMotionProps<"div">;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

interface Modal extends SComponent<ModalProps> {}

const Modal: Modal = ({
  children,
  isOpen,
  onClose,
  containerProps,
  overlayProps,
  portalProps,
}) => {
  const [withModalContent] = useFilterChildren(children, ModalContent);

  const onEscape = React.useCallback(
    (event: KeyboardEvent) => {
      event.stopPropagation();
      if (event.key === "Escape") onClose();
    },
    [onClose]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", onEscape, false);
    return () => document.removeEventListener("keydown", onEscape, false);
  }, [isOpen, onEscape]);

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <Portal {...portalProps}>
          <div
            data-test="modal-root"
            className={clsx([
              "h-screen w-screen fixed inset-0 overflow-none z-[60]",
              containerProps?.className,
            ])}
          >
            <motion.div
              data-test="modal-overlay"
              className={clsx([
                "z-[60] fixed inset-0 bg-black",
                overlayProps?.className,
              ])}
              variants={{
                open: { opacity: 1, pointerEvents: "auto" },
                closed: { opacity: 0, pointerEvents: "none" },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: "tween" }}
              onClick={onClose}
            />
            {withModalContent}
          </div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

Modal.displayName = "Drawer";

interface DrawerContentProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export const ModalContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <motion.div
      data-test="modal-content"
      ref={ref}
      className={clsx(["absolute z-[200]", className])}
      transition={{ type: "spring", stiffness: 350, damping: 40 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

ModalContent.displayName = "ModalContent";

export default Modal;
