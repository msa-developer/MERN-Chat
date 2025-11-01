import React from "react";
import { useChat } from "../zustand/useChat";
import ChatHeader from "./ChatHeader";

const ChatSection = () => {
  const { selectedUser, messageLoading, messagesById } = useChat();
  React.useEffect(() => {
    messagesById(selectedUser._id);
  }, [messagesById, selectedUser]);
  return (
    <div className="min-h-full w-full">
      <ChatHeader />
    </div>
  );
};

export default ChatSection;
