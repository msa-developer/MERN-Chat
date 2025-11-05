import { LogOut, PanelRightOpen, UserPen } from "lucide-react";
import { useAuth } from "../../zustand/useAuth";
import React from "react";
import { useSlide } from "../../zustand/slide";

const ProfileSection = () => {
  const [selectedImg, setSelectedImg] = React.useState(null);
  const { authUser, updateProfile, LogoutUser } = useAuth();

  const imgRef = React.useRef(null);

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const img = reader.result;
      setSelectedImg(img);
      await updateProfile(img);
    };
  };

  const { setShowFalse } = useSlide();

  return (
    <div className="p-3 flex-wrap flex justify-around items-center">
      <section className="flex justify-around items-center gap-2">
        <div
          className="bg-secondary avatar  cursor-pointer hover:bg-info rounded-full w-15 h-15 md:w-20 md:h-20 overflow-hidden flex items-center justify-center"
          onClick={() => imgRef.current.click()}
        >
          {selectedImg || authUser?.profilePic ? (
            selectedImg ? (
              <img src={selectedImg} className="w-full h-full object-cover  " />
            ) : (
              <img
                src={authUser?.profilePic}
                className="w-full h-full object-cover "
              />
            )
          ) : (
            <UserPen className="w-6 h-6" />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImg}
            className="hidden"
            ref={imgRef}
          />
        </div>
        <span className="text-white w-[120px] lg:w-[180px] truncate ">
          {authUser?.fullName}
        </span>
      </section>

      <section className="flex gap-2">
        <button onClick={LogoutUser} className="btn hover:btn-soft btn-info">
          <LogOut />
        </button>

        <button className="btn hover:btn-soft btn-info" onClick={setShowFalse}>
          <PanelRightOpen />
        </button>
      </section>
    </div>
  );
};

export default ProfileSection;
