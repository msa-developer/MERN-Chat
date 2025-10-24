import Tabs from "../Components/Tabs";
import Profile from "../Components/Profile";
import useChat from "../zustand/useChat";
import ChatsList from "../Components/ChatsList.jsx";
import Contacts from "../Components/Contacts.jsx";
import ChatContainer from "../Components/ChatContainer.jsx";
import NotSelected from "../Components/NotSelected.jsx";

const ChatPage = () => {
  const { currentTab, selectedUser } = useChat();
  return (
    <main className="h-screen">
      <div className="carousel bg-base-200 border border-accent carousel-vertical carousel-end rounded-box h-full w-sm">
        {/* Left Side Part of the Screen -> Slide Bar */}
        <div className="carousel-item h-full">
          <Profile />
          <Tabs />

          {/* Contacts here */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {currentTab === "chats" ? <ChatsList /> : <Contacts />}
          </div>
        </div>
        {/* Rigth side Chat Page */}
        <div className="flex-1 flex flex-col bg-slate-800">
          {selectedUser ? <ChatContainer /> : <NotSelected />}
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
