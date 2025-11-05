import { useChat } from "../../zustand/useChat";
import React from "react";
import { useAuth } from "../../zustand/useAuth.js";

const ChatArea = () => {
  const { messages, selectedUser, getMessageById } = useChat();
  const { authUser } = useAuth();
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    getMessageById();
  }, [selectedUser]);

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="overflow-y-scroll p-10 m-1">
        {messages.length > 0
          ? messages.map((msg, index) => (
              <div
                className={`chat  ${authUser._id === msg.sendersId ? "chat-end" : "chat-start"}`}
              >
                <div key={index} className={`chat-bubble `}>
                  {msg.text}
                </div>
                {index === messages.length - 1 && <div ref={scrollRef} />}
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default ChatArea;
