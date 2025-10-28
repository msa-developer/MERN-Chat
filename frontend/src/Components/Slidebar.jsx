import ProfileSection from "./ProfileSection";
import TabsSection from "../Components/TabsSection.jsx";

const Slidebar = () => {
  return (
    <div className="carousel p-2 bg-base-200 border-base-300 rounded-box w-sm flex flex-col ">
      <ProfileSection />
      <div className="divider divider-success"></div>
      <TabsSection />
    </div>
  );
};

export default Slidebar;
