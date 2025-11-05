import { PanelRightOpen, PanelRightClose } from "lucide-react";
import ProfileSection from "./ProfileSection.jsx";
import TabsSection from "./TabsSection.jsx";

const Slidebar = () => {
  return (
    <div className="w-full h-screen lg:max-w-1/4 flex flex-col bg-slate-900">
      <ProfileSection />
      <TabsSection />
    </div>
  );
};

export default Slidebar;
