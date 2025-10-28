import { EllipsisVertical, LogOut } from "lucide-react";
import { useAuth } from "../zustand/useAuth";

const ProfileSection = () => {
  const { loggingOut, logout, user } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="flex flex-wrap justify-between mt-1 h-1/12 items-center w-full">
      <div className="flex flex-wrap justify-between items-center">
        <div className="bg-neutral grid place-content-center text-neutral-content w-14 h-14 rounded-full">
          <span className="text-2xl">
            {user.fullName
              .split(" ")
              .slice(0, 2)
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </span>
        </div>
        <span className="text-2xl">{user.fullName}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleLogout}
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
