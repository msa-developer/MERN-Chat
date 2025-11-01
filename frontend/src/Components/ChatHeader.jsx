import { UserRoundPen, X } from "lucide-react";
import { useChat } from "../zustand/useChat";
import React from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChat();

  React.useEffect(() => {
    const restoreUser = (e) => {
      if (e.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", restoreUser);

    return () => {
      window.removeEventListener("keydown", restoreUser);
    };
  }, [selectedUser]);

  return (
    <main className="w-full p-3 relative flex items-center lg:justify-around justify-between">
      <div className="flex justify-center items-center gap-2">
        <div className="avatar avatar-online">
          {selectedUser?.profilePic ? (
            <img src={selectedUser?.profilePic} className="w-10 h-10" />
          ) : (
            <UserRoundPen className="w-10 h-10" />
          )}
        </div>

        <div className="truncate font-bold max-w-[100px] md:max-w-[300px] lg:max-w-[600px]">
          {selectedUser?.fullName}
        </div>
      </div>

      <X onClick={() => setSelectedUser(null)} />
    </main>
  );
};

export default ChatHeader;
