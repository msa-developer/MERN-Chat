import { PanelRightOpen, PanelRightClose } from "lucide-react";
import ProfileSection from "./ProfileSection.jsx";

const Slidebar = () => {
  return (
    <div className="w-full h-screen md:max-w-64 lg:max-w-1/4 flex flex-col bg-slate-900">
      <ProfileSection />
    </div>
  );
};

export default Slidebar;
