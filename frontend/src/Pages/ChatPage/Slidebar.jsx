import { PanelRightOpen, PanelRightClose } from "lucide-react";
import ProfileSection from "./ProfileSection.jsx";
import TabsSection from "./TabsSection.jsx";
import { useSlide } from "../../zustand/slide.js";
import List from "./List.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

const Slidebar = () => {
  const { show } = useSlide();

  const sideRef = React.useRef();

  useGSAP(
    () => {
      gsap.to(sideRef.current, {
        x: show ? "0" : "-100%",
        ease: "power4.out",
        duration: 1,
      });
    },
    { scope: sideRef, dependencies: [show] },
  );

  console.log(show);

  return (
    <div
      ref={sideRef}
      className="sideBar w-full h-screen lg:max-w-1/4 flex flex-col bg-slate-900 absolute left-0 z-50"
    >
      <ProfileSection />
      <TabsSection />
      <List />
    </div>
  );
};

export default Slidebar;
