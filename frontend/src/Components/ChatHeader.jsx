import { UserRoundPen, X } from "lucide-react";
import { useChat } from "../zustand/useChat";

const ChatHeader = () => {
  const { selectedUser } = useChat();
  return (
    <main className="w-full p-3 relative flex items-center lg:justify-around justify-between">
      <div className="flex justify-center items-center gap-2">
        <div className="avatar avatar-online">
          {selectedUser.profilePic ? (
            <img src={selectedUser.profilePic} className="w-10 h-10" />
          ) : (
            <UserRoundPen className="w-10 h-10" />
          )}
        </div>

        <div className="truncate font-bold max-w-[100px] md:max-w-[300px] lg:max-w-[600px]">
          {selectedUser.fullName}
        </div>
      </div>

      <X />
    </main>
  );
};

export default ChatHeader;
