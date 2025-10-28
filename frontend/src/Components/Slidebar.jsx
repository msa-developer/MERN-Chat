import ProfileSection from "./ProfileSection";
import TabsSection from "../Components/TabsSection.jsx";

const Slidebar = () => {
  return (
    <div className="relative carousel p-2 bg-base-200 border-base-300 rounded-box md:w-sm w-1/4 flex flex-col ">
      <ProfileSection />
      <TabsSection />
    </div>
  );
};

export default Slidebar;
