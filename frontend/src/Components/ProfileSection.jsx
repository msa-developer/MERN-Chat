import { EllipsisVertical, LogOut, UserRoundPen } from "lucide-react";
import { useAuth } from "../zustand/useAuth";
import { useRef, useState } from "react";

const ProfileSection = () => {
  const { loggingOut, logout, user, updateProfile } = useAuth();
  const [selectedImg, setSelectedImg] = useState(null);

  const inputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.file[0];
    const reader = new FileReader(file);
    reader.onloadend = async () => {
      const bit64Image = reader.result;
      await updateProfile(bit64Image);
    };
  };

  console.log("user full name : ", user.fullName);

  return (
    <div className="flex flex-wrap justify-around mt-1 items-center w-full">
      <div className="flex flex-wrap items-center">
        <div className="avatar online gap-1 items-center flex">
          <button
            className="w-24 overflow-hidden rounded-full"
            onClick={inputRef.current.onclick()}
          >
            {selectedImg || user.profile ? (
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
            className="hidden"
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageUpload}
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
