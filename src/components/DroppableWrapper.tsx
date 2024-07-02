import { useDroppable } from "@dnd-kit/core";
import React, { cloneElement } from "react";
import { Children } from "react";

export function DroppableWrapper({
  id,
  children,
}: {
  id: any;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  // Clone each child and add the dynamic classname
  const childrenWithClassName = Children.map(children, (child) => {
    // Ensure the child is a valid element before cloning
    if (React.isValidElement(child)) {
      return cloneElement(child as React.ReactElement, {
        className:
          `${child.props.className || ""} ${isOver ? "bg-muted" : ""}`.trim(),
      });
    }
    return child;
  });

  return <div ref={setNodeRef}>{childrenWithClassName}</div>;
}
