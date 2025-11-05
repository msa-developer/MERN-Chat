import { PanelRightClose, UserPen } from "lucide-react";
import { useSlide } from "../../zustand/slide";
import { useChat } from "../../zustand/useChat";

const ChatHeader = () => {
  const { setShowTrue, show } = useSlide();
  const { selectedUser } = useChat();

  return (
    <section className="p-3">
      <header className="flex p-3 gap-3 items-center">
        {!show && (
          <button className="btn btn-soft btn-secondary" onClick={setShowTrue}>
            <PanelRightClose />
          </button>
        )}

        {selectedUser && (
          <div className="flex justify-between  items-center gap-4 p-3">
            {selectedUser?.profilePic ? (
              <img src={selectedUser?.profilPic} />
            ) : (
              <UserPen size={50} />
            )}
            <span>{selectedUser?.fullName}</span>
          </div>
        )}
      </header>
    </section>
  );
};

export default ChatHeader;
