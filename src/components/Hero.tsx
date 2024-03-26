import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";
import yettiIcon from "/cuteCreativeYeti.jpeg";
export const Hero = () => {
  const { data: user } = useAuth();

  return (
    <section className="h-100vh flex flex-col items-center justify-center gap-4 px-2 py-20">
      <img className="h-24 w-24 rounded-full" src={yettiIcon} />
      <div className="space-y-6 text-center">
        <main className="text-5xl font-extrabold md:text-6xl">
          Save. Note. Repeat.
          <span className="block text-primary"></span>
        </main>

        <p className="mx-auto text-xl text-muted-foreground md:w-10/12">
          Save your bookmarks and take notes with ease. Yetti keeps everything
          organized and accessible.
        </p>
      </div>
      <Button>
        <a href={user ? "/saves" : "/login"}>Get started</a>
      </Button>
      <p className="text-sm text-muted-foreground"> No credit card required.</p>
    </section>
  );
};
