import React from "react";
import { useDraggable } from "@dnd-kit/core";

type Props = { id: any; children: any };

export function DraggableWrapper(props: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `scale(0.9) translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      className={"animate-shrink"}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}
