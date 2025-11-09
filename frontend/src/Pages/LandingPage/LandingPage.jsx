import HeroSection from "./HeroSection";

const LandingPage = () => {
  return (
    <>
      <nav className="p-3">
        <div className="navbar bg-base-300 shadow-sm ">
          <a
            href="https://mern-chat-dnmr.onrender.com/"
            className="btn btn-neutral text-xl"
          >
            Get Started Here
          </a>
        </div>
      </nav>
      <HeroSection />
    </>
  );
};

export default LandingPage;
