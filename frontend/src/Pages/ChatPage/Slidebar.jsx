import { PanelRightOpen, PanelRightClose } from "lucide-react";
import ProfileSection from "./ProfileSection.jsx";

const Slidebar = () => {
  return (
    <div className="bg-base-300 w-full h-screen md:max-w-64 lg:max-w-1/4 flex flex-col">
      <ProfileSection />
    </div>
  );
};

export default Slidebar;
