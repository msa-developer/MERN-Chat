import { useChat } from "../zustand/useChat";

const ChatSection = () => {
  const { selectedUser, messageLoading } = useChat();
  return <div>ChatSection</div>;
};

export default ChatSection;
