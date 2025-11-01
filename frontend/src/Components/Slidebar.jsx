import ProfileSection from "./ProfileSection";
import TabsSection from "../Components/TabsSection.jsx";

const Slidebar = () => {
  return (
    <div className="w-1/2 sm:w-1/2 lg:w-1/3  flex flex-col p-3 bg-base-200 border border-base-300 rounded-box  ">
      <ProfileSection />
      <TabsSection />
    </div>
  );
};

export default Slidebar;
