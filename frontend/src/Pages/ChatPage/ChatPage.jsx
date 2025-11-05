import { Activity } from "react";
import { useSlide } from "../../zustand/slide";
import Slidebar from "./Slidebar";
import ChatArea from "./ChatArea";

const ChatPage = () => {
  const { show } = useSlide();
  return (
    <div className="flex">
      <Activity mode={show ? "visible" : "hidden"}>
        <Slidebar />
      </Activity>
      <ChatArea />
    </div>
  );
};

export default ChatPage;
