import { LogOut, PanelRightOpen, UserPen } from "lucide-react";
import { useAuth } from "../../zustand/useAuth";
import React from "react";

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

  return (
    <div className="p-3 flex justify-around">
      <button
        className="btn rounded-full p-3 w-10 h-10 overflow-hidden flex items-center justify-center"
        onClick={() => imgRef.current.click()}
      >
        <div>
          {selectedImg || authUser?.profilePic ? (
            <img src={selectedImg} className="object-cover w-full" />
          ) : (
            <UserPen />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImg}
          className="hidden"
          ref={imgRef}
        />
      </button>

      <section className="flex gap-2">
        <button onClick={LogoutUser} className="btn hover:btn-soft btn-info">
          <LogOut />
        </button>

        <button onClick={LogoutUser} className="btn hover:btn-soft btn-info">
          <PanelRightOpen />
        </button>
      </section>
    </div>
  );
};

export default ProfileSection;
