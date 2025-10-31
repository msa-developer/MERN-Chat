import { EllipsisVertical, LogOut, UserRoundPen } from "lucide-react";
import { useAuth } from "../zustand/useAuth";
import { useRef, useState } from "react";

const ProfileSection = () => {
  const { loggingOut, logout, user, updateProfile } = useAuth();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInput = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="flex flex-wrap justify-around mt-1 items-center w-full">
      <div className="flex flex-wrap items-center">
        <div className="avatar online gap-1 items-center flex">
          <button
            onClick={() => fileInput.current.click()}
            className="w-24 overflow-hidden rounded-full cursor-pointer relative"
          >
            <div className="absolute rounded-full bg-black/50 opacity-0 hover:opacity-100 w-full h-full text-center content-center">
              <span className="text-white text-xs font-bold">Change</span>
            </div>

            {selectedImg || user.profilePic ? (
              <img
                src={selectedImg || user.profilePic}
                alt="UserImg"
                className="size-full object-cover"
              />
            ) : (
              <UserRoundPen size={80} />
            )}
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={handleImageUpload}
            className="hidden"
          />

          <h3 className="text-base text-center max-w-[180px] font-medium text-slate-200 truncate">
            {user.fullName}
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={logout}
          disabled={loggingOut}
          className="btn  btn-outline btn-accent"
        >
          <LogOut size={20} />
        </button>

        <button className="btn  btn-outline btn-accent">
          <EllipsisVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
