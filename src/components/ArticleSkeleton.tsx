import React from "react";
import { Skeleton } from "./ui/skeleton";

type Props = {
  numCards: number;
};

const ArticleSkeleton = (props: Props) => {
  let cardsSkeleton = [];
  for (let i = 0; i < props.numCards; i++) {
    cardsSkeleton.push(
      <div className="flex w-[330px] flex-col space-y-3" key={i}>
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </div>,
    );
  }

  return cardsSkeleton;
};

export default ArticleSkeleton;
