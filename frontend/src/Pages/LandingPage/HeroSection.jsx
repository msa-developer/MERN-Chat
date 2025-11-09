import ChatImg from "./images/chats.png";
import mobileView from "./images/ChatViewMobile.png";
import mobile from "./images/SlidebarMobileView.png";
const HeroSection = () => {
  return (
    <>
      <section className="p-3 bg-slate-300 lg:w-6xl lg:mx-auto m-3 border-rounded">
        <div className="text-xl p-3 gap-2 flex items-center flex-col md:flex-row lg:justify-center bg-gradient-to-r font-bold md:text-4xl from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Get Ready With The Real Time Communication
          <br />
          And Connect with your Loved Ones
          <img src={mobileView} />
        </div>
      </section>

      <section className="p-3">
        <img src={ChatImg} />
      </section>
    </>
  );
};

export default HeroSection;
