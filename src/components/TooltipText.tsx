import React from "react";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";

type Props = {
  text: string;
  child: any;
};

const ToolTipText = ({
  text,
  child,
  ...props
}: {
  text: string;
  child: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <TooltipProvider {...props}>
      <Tooltip>
        <TooltipTrigger asChild>
          {child}
          {/* <Button variant="outline">Hover</Button> */}
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-balanced flex max-w-96">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTipText;
