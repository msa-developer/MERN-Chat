import { Github } from "lucide-react";
import HeroSection from "./HeroSection";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <>
      <section className="p-3 sticky top-0">
        <nav className="navbar flex gap-2 justify-around bg-base-300 shadow-sm">
          <Link
            to="/chat"
            className="btn font-bold btn-neutral text-xs md:text-lg"
          >
            Get Started Here
          </Link>
          <a href="https://github.com/msa-developer/Mern-Chat">
            <button className="btn hover:btn-info">
              <Github />
            </button>
          </a>
        </nav>
      </section>
      <HeroSection />
    </>
  );
};

export default LandingPage;
