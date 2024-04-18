import React from "react";
import { Skeleton } from "./ui/skeleton";

type Props = {
  numCards: number;
};

const ArticleSkeleton = (props: Props) => {
  let cardsSkeleton = [];
  for (let i = 0; i < props.numCards; i++) {
    cardsSkeleton.push(
      <div className="flex grow flex-col space-y-3" key={i}>
        <Skeleton className="h-[128px] w-full rounded-xl sm:h-[160px] lg:h-[128px]" />
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
