import * as React from "react";

export type FilteredChildren = React.ReactElement<any, any>[];

export default function useFilterChildren(
  children: React.ReactNode,
  target: React.ElementType
) {
  return React.useMemo(() => {
    const withTarget: FilteredChildren = [];
    const withoutTarget: React.ReactNode[] = React.Children.toArray(
      children
    ).map((item) => {
      if (React.isValidElement(item) && item.type === target) {
        withTarget.push(item);
        return null;
      }

      return item;
    });

    return [withTarget, withoutTarget];
  }, [children, target]);
}
