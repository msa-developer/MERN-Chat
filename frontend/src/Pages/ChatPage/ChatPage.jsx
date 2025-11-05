import { Activity } from "react";
import { useSlide } from "../../zustand/slide";
import Slidebar from "./Slidebar";
import ChatArea from "./ChatArea";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput.jsx";
import { useChat } from "../../zustand/useChat";

const ChatPage = () => {
  const { show } = useSlide();
  const { selectedUser } = useChat();
  return (
    <div className="flex w-full h-screen ">
      <Activity mode={show ? "visible" : "hidden"}>
        <Slidebar />
      </Activity>

      <section className="flex flex-col">
        <ChatHeader />
        {selectedUser ? <ChatArea /> : null}
      </section>
    </div>
  );
};

export default ChatPage;
