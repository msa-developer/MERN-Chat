import ChatSection from "../Components/ChatSection";
import Slidebar from "../Components/Slidebar";
import { useChat } from "../zustand/useChat";

const Chat = () => {
  const { selectedUser } = useChat();
  return (
    <main className="min-h-screen w-full flex">
      <Slidebar />
      {selectedUser ? <ChatSection /> : null}
    </main>
  );
};

export default Chat;
