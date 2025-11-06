import { PanelRightClose, UserPen } from "lucide-react";
import { useSlide } from "../../zustand/slide";
import { useChat } from "../../zustand/useChat";
import { useAuth } from "../../zustand/useAuth";

const ChatHeader = () => {
  const { setShowTrue, show } = useSlide();
  const { selectedUser } = useChat();
  const { onlineUsers } = useAuth();

  return (
    <section className="p-3">
      <header className="flex p-3 gap-3 items-center">
        {!show && (
          <button className="btn btn-soft btn-secondary" onClick={setShowTrue}>
            <PanelRightClose />
          </button>
        )}

        {selectedUser && (
          <div className={`flex justify-between items-center gap-4 p-3`}>
            {/* Add relative to this container */}
            <div className="relative">
              {selectedUser?.profilePic ? (
                <img
                  src={selectedUser?.profilePic}
                  className="rounded-full w-10 h-10 md:w-20 md:h-20"
                  alt={selectedUser.fullName}
                />
              ) : (
                <UserPen size={50} />
              )}

              {onlineUsers?.includes(selectedUser?._id) && (
                <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            <span>{selectedUser?.fullName}</span>
          </div>
        )}
      </header>
    </section>
  );
};

export default ChatHeader;
