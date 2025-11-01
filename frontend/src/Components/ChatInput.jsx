import React from "react";
import { useChat } from "../zustand/useChat";
import { SendHorizonal, Upload } from "lucide-react";

const ChatInput = () => {
  const [text, setText] = React.useState("");
  const { sendMessage, user } = useChat();

  const fileRef = React.useRef(null);

  return (
    <>
      <section className="flex gap-2 flex-col md:flex-row justify-center items-center">
        <div className="flex gap-1 justify-center w-full items-center">
          <input ref={fileRef} type="file" className="hidden" />
          <button
            onClick={() => fileRef.current.click()}
            className="btn rounded-full hover:btn-primary w-12 h-12 md:w-15 md:h-15"
          >
            <Upload />
          </button>
          <input
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here"
            className="input md:input-lg w-full"
          />
        </div>
        <div
          onClick={() => sendMessage(user._id, text)}
          className="btn bg-red-900 font-bold "
        >
          <SendHorizonal />
        </div>
      </section>
    </>
  );
};

export default ChatInput;
