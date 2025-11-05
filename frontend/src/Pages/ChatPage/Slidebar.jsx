import { PanelRightOpen, PanelRightClose } from "lucide-react";
import ProfileSection from "./ProfileSection.jsx";
import TabsSection from "./TabsSection.jsx";
import { useSlide } from "../../zustand/slide.js";
import List from "./List.jsx";

const Slidebar = () => {
  const { show } = useSlide();

  return (
    <div className="w-full absolute h-screen lg:max-w-1/4 flex flex-col bg-slate-900">
      <ProfileSection />
      <TabsSection />
      <List />
    </div>
  );
};

export default Slidebar;
