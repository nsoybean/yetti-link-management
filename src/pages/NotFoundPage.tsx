import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, TrackPreviousIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import blankVoid from "@/assets/blankVoid.svg";

type Props = {};

const NotFoundPage = (props: Props) => {
  const navigate = useNavigate();
  const { data: user } = useAuth();

  return (
    <div className="container mx-auto flex justify-center py-10">
      <div className="flex flex-col items-center justify-center gap-10">
        {/* svg */}
        <img width={"200px"} src={blankVoid} />

        {/* text */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-md scroll-m-20 text-primary">
            Oops, page not found
          </h1>
          <Button onClick={() => navigate(user ? "/saves" : "/")}>
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to home</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
