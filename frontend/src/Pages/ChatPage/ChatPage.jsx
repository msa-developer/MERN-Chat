import React, { Activity } from "react";
import { useSlide } from "../../zustand/slide";
import Slidebar from "./Slidebar";
import ChatArea from "./ChatArea";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput.jsx";
import { useChat } from "../../zustand/useChat";

const ChatPage = () => {
  const { show } = useSlide();
  const { selectedUser, setSelectedUser } = useChat();

  React.useEffect(() => {
    const removeUser = (e) => {
      if (e.code === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keyup", removeUser);
    return () => window.removeEventListener("keyup", removeUser);
  }, [setSelectedUser]);

  return (
    <div className="flex w-full h-screen ">
      <Activity mode={show ? "visible" : "hidden"}>
        <Slidebar />
      </Activity>

      <section className="flex w-full flex-col relative pb-20">
        <ChatHeader />
        {selectedUser ? <ChatArea /> : null}
        {selectedUser ? <ChatInput /> : null}
      </section>
    </div>
  );
};

export default ChatPage;
