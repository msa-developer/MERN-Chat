import { useChat } from "../../zustand/useChat";
import React from "react";
import { useAuth } from "../../zustand/useAuth.js";

const ChatArea = () => {
  const {
    messages,
    selectedUser,
    getMessageById,
    RealTimeMsg,
    StopRealTimeMsg,
  } = useChat();
  const { authUser } = useAuth();
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    getMessageById();
    RealTimeMsg();
    return () => StopRealTimeMsg();
  }, [RealTimeMsg, StopRealTimeMsg, getMessageById, selectedUser]);

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
                key={index}
              >
                <div className="chat-footer">
                  <time className="text-xs opacity-80">
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </time>
                </div>
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
