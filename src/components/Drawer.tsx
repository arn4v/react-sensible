import { Portal, PortalProps } from "@reach/portal";
import clsx from "clsx";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";
import useFilterChildren from "../hooks/use-filter-children";
import { SComponent } from "../types";

export interface DrawerProps {
  portalProps?: Omit<PortalProps, "children">;
  containerProps?: {
    className?: string;
  };
  overlayProps?: {
    className?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen,
  onClose,
  containerProps,
  overlayProps,
  portalProps,
}) => {
  const [withDrawerContent] = useFilterChildren(children, DrawerContent);

  React.useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", onEscape, false);
    } else {
      document.removeEventListener("keydown", onEscape, false);
    }

    return document.removeEventListener("keydown", onEscape, false);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal {...portalProps}>
          <div
            data-test="drawer"
            className={clsx([
              "h-screen w-screen fixed inset-0 overflow-none",
              containerProps?.className ?? "z-[100]",
            ])}
          >
            <motion.div
              data-test="drawer-overlay"
              className={clsx([
                "z-10 fixed inset-0 bg-black",
                overlayProps?.className,
              ])}
              style={
                {
                  "--tw-bg-opacity": 0.4,
                } as any
              }
              variants={{
                open: { opacity: 1, pointerEvents: "auto" as const },
                closed: { opacity: 0, pointerEvents: "none" as const },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: "tween" }}
              onClick={onClose}
            />
            {withDrawerContent}
          </div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

interface DrawerContentProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  placement: "top" | "bottom" | "left" | "right";
}

export const DrawerContent: React.ForwardRefExoticComponent<DrawerContentProps> =
  React.forwardRef<HTMLDivElement, DrawerContentProps>(
    ({ children, placement, className }, ref) => {
      const [openVariant, closeVariant] = React.useMemo(() => {
        switch (placement) {
          case "top": {
            return [{ y: "0" }, { y: "-100%" }];
          }
          case "bottom": {
            return [{ y: "0" }, { y: "100%" }];
          }
          case "left": {
            return [{ x: "0" }, { x: "-100%" }];
          }
          case "right": {
            return [{ x: "0" }, { x: "100%" }];
          }
          default: {
            return [{}, {}];
          }
        }
      }, [placement]);

      return (
        <motion.div
          data-test="drawer-content"
          ref={ref}
          className={clsx([
            "absolute z-30",
            placement === "top" && "top-0",
            placement === "bottom" && "bottom-0",
            placement === "left" && "left-0",
            placement === "right" && "right-0",
            className,
          ])}
          initial="closed"
          animate="open"
          exit="closed"
          variants={{
            open: { opacity: 1, ...openVariant },
            closed: { opacity: 0, ...closeVariant },
          }}
          transition={{ type: "spring", stiffness: 350, damping: 40 }}
        >
          {children}
        </motion.div>
      );
    }
  );

export default Drawer;
