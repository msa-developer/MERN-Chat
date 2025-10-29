import { EllipsisVertical, LogOut, UserRoundPen } from "lucide-react";
import { useAuth } from "../zustand/useAuth";
import { useRef, useState } from "react";

const ProfileSection = () => {
  const { loggingOut, logout, user, updateProfile } = useAuth();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInput = useRef(null);
  console.log("user is ", user);

  const handleImageUpload = (e) => {
    const file = e.target.file[0];
    const reader = new FileReader(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      await updateProfile(base64Image);
    };
  };

  console.log("user full name : ", user.fullName);

  return (
    <div className="flex flex-wrap justify-around mt-1 items-center w-full">
      <div className="flex flex-wrap items-center">
        <div className="avatar online gap-1 items-center flex">
          <button
            onClick={() => fileInput.current.click()}
            className="w-24 overflow-hidden rounded-full"
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
