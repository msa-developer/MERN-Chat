import { LogOut } from "lucide-react";
import { useAuth } from "../zustand/useAuth";

const ProfileSection = () => {
  const { loggingOut, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="btn  btn-outline btn-accent"
      >
        <LogOut size={20} />
      </button>
    </div>
  );
};

export default ProfileSection;
