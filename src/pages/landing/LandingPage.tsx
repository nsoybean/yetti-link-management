import { Hero } from "@/components/Hero";
import { LandingPageNavbar } from "@/components/LandingPageNavbar";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <>
      <LandingPageNavbar />
      <Hero />
    </>
  );
};

export default LandingPage;
