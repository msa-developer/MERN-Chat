import { Activity } from "react";
import { useSlide } from "../../zustand/slide";
import Slidebar from "./Slidebar";
import ChatArea from "./ChatArea";
import ChatHeader from "./ChatHeader";

const ChatPage = () => {
  const { show } = useSlide();
  return (
    <div className="flex">
      <Activity mode={show ? "visible" : "hidden"}>
        <Slidebar />
      </Activity>

      <ChatHeader />
      <ChatArea />
    </div>
  );
};

export default ChatPage;
