import React from "react";
import { useChat } from "../zustand/useChat";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput.jsx";
import { useAuth } from "../zustand/useAuth";

const ChatSection = () => {
  const { selectedUser, messagesById, messages } = useChat();
  const { user } = useAuth();

  const endOfMessage = React.useRef(null);

  React.useEffect(() => {
    if (selectedUser) messagesById(selectedUser._id);
  }, [messagesById, selectedUser]);

  React.useEffect(() => {
    endOfMessage.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="w-full h-[800px] md:h-[1000px] relative flex flex-col justify-between overflow-y-scroll">
        <section className="px-6 py-6 h-full ">
          {messages.length > 0 ? (
            <>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`chat  ${msg.sendersId === user._id ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`chat-bubble ${msg.sendersId === user._id ? "bg-cyan-600" : "bg-slate-800"}`}
                  >
                    {msg.image && <img src={msg.image} />}
                    {msg.text && <p>{msg.text}</p>}
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </section>
        <div className="bg-black" ref={endOfMessage} />
        <ChatInput />
      </div>
    </>
  );
};

export default ChatSection;
