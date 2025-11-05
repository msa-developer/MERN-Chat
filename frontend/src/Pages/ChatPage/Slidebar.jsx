import { PanelRightOpen, PanelRightClose } from "lucide-react";
import ProfileSection from "./ProfileSection.jsx";
import TabsSection from "./TabsSection.jsx";
import { useSlide } from "../../zustand/slide.js";

const Slidebar = () => {
  const { show } = useSlide();

  return (
    <div className="w-full h-screen lg:max-w-1/4 flex flex-col bg-slate-900">
      <ProfileSection />
      <TabsSection />
    </div>
  );
};

export default Slidebar;
