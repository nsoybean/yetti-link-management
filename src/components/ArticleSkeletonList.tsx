import { Skeleton } from "./ui/skeleton";

type Props = {
  numCards: number;
};

const ArticleSkeletonList = (props: Props) => {
  let cardsSkeleton = [];
  for (let i = 0; i < props.numCards; i++) {
    cardsSkeleton.push(
      <div className="flex grow flex-col space-y-3" key={i}>
        <Skeleton className="h-24 w-full" />
        {/* title */}
        {/* <Skeleton className="h-4 w-7/12" />

        <div className="flex flex-row justify-between">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-4" />
        </div> */}
      </div>,
    );
  }

  return <div className="flex flex-col gap-4"> {cardsSkeleton} </div>;
};

export default ArticleSkeletonList;
