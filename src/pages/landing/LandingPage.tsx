import { LandingPageNavbar } from "@/components/LandingPageNavbar";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import yettiIcon from "/cuteCreativeYeti.jpeg";
import { Link2Icon } from "@radix-ui/react-icons";
import { NotebookTextIcon, TagIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {};

const LandingPage = (props: Props) => {
  const navigate = useNavigate();

  async function login() {
    navigate("/saves");
  }

  return (
    <div>
      <LandingPageNavbar />
      {/* <Hero /> */}

      {/* HERO */}
      <section className="h-100vh flex flex-col items-center justify-center gap-6 px-2 py-24 sm:py-32">
        <img className="h-24 w-24 rounded-full" src={yettiIcon} />
        <div className="space-y-6 text-center">
          <main className="text-4xl font-bold md:text-6xl md:font-extrabold">
            Never Lose a Link Again
            <span className="block text-primary"></span>
          </main>

          <p className="mx-auto text-lg text-muted-foreground md:w-10/12">
            Link management platform to keep your links organized, always
            accessible.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button>
            <a onClick={() => login()}>Get started ➔</a>
          </Button>
          <p className="text-sm text-muted-foreground">
            No credit card required. Instant set up.
          </p>
        </div>
      </section>

      {/* SCREENSHOTS + VALUE PROP */}
      <section className="h-100vh flex flex-col items-center justify-center gap-4 bg-primary/[.06] px-2 py-4">
        <div className="container">
          <div className="flex flex-col-reverse items-center gap-4 sm:flex-row">
            {/* text */}
            <div className="mb-4 flex flex-col p-2 md:mb-0 md:w-6/12 lg:w-5/12">
              <h2 className="mb-4 text-xl font-bold">Simplify Your Web Life</h2>
              <p className="mb-3 text-lg font-light">
                {/* Say goodbye to cluttered bookmarks and scattered links. Yetti
                streamlines your digital life by allowing you to save links, add
                tags and notes, and effortlessly organize your web bookmarks. */}
                Say goodbye to chaotic bookmarks and tangled links. Yetti makes
                it a breeze to save, tag, search and manage your links.
              </p>
              <p className="mb-6 text-muted-foreground">
                Focus on what matters most, and let Yetti handle the rest.
              </p>
            </div>
            {/* img */}
            <div className="flex flex-col rounded-md md:w-6/12 lg:w-7/12">
              <img
                alt="product"
                className="ml-auto"
                src="https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/98cb6dfc-bf28-458f-b816-fe876d503e97.png"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-6 sm:py-32">
        <div className="container">
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* feat: link preview */}
            <div className="my-4 flex flex-col md:w-6/12 lg:w-4/12">
              <div className="flex h-[65px] w-[65px] items-center justify-center rounded-full bg-primary/[.06] text-primary">
                <Link2Icon width={20} height={20} />
              </div>
              {/* title */}
              <h4 className="text-md mt-2 pt-2 font-bold">Link Preview</h4>
              {/* desc */}
              <p className="w-md pt-0.5 font-normal leading-tight">
                Preview image, title and description of saved link directly
                within Yetti.
              </p>
            </div>

            {/* feat: smart tagging */}
            <div className="my-4 flex flex-col md:w-6/12 lg:w-4/12">
              <div className="flex h-[65px] w-[65px] items-center justify-center rounded-full bg-primary/[.06] text-primary">
                <TagIcon width={18} height={18} />
              </div>
              {/* title */}
              <h4 className="text-md mt-2 pt-2 font-bold">Smart Tagging</h4>
              {/* desc */}
              <p className="w-md pt-0.5 font-normal leading-tight">
                Automatically organize your links with intelligent tagging. Find
                what you need faster with smart categorization.
              </p>
            </div>

            {/* feat: add notes */}
            <div className="my-4 flex flex-col md:w-6/12 lg:w-4/12">
              <div className="flex h-[65px] w-[65px] items-center justify-center rounded-full bg-primary/[.06] text-primary">
                <NotebookTextIcon width={18} height={18} />
              </div>
              {/* title */}
              <h4 className="text-md mt-2 pt-2 font-bold">Rich Text Editor</h4>
              {/* desc */}
              <p className="w-md pt-0.5 font-normal leading-tight">
                Add custom notes within Yetti. Format your notes exactly how you
                want them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WAVE DESIGN */}
      <section>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="-mb-px fill-primary text-primary"
        >
          <path d="M0,224L120,197.3C240,171,480,117,720,112C960,107,1200,149,1320,170.7L1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
        </svg>
      </section>

      {/* CTA */}
      <section className="bg-primary-50 mb-12 py-4 sm:mb-24 sm:py-0" id="cta">
        <div className="container">
          <div className="row">
            <div className="col mx-auto text-center md:w-6/12">
              <h2 className="mb-3 font-semibold">
                Ready to organize your links?
              </h2>
              <h5 className="mb-4">
                Try it free. No credit card required. Instant set-up.
              </h5>
              <div className="mb-3 flex flex-col justify-center gap-x-2 gap-y-3 md:flex-row">
                <Button>
                  <a onClick={() => login()}>Get started ➔</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
