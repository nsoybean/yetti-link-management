import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";
import yettiIcon from "/cuteCreativeYeti.jpeg";
export const Hero = () => {
  const { data: user } = useAuth();

  return (
    <section className="flex h-svh flex-col items-center justify-center gap-4 py-20 md:py-32">
      <img className="h-24 w-24 rounded-full" src={yettiIcon} />
      <div className="space-y-6 text-center">
        <main className="text-5xl font-extrabold md:text-6xl">
          {/* <div className="text-6xl font-extrabold">
            <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Streamline
            </span>
          </div>
          your web experience */}
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
    </section>
  );
};
