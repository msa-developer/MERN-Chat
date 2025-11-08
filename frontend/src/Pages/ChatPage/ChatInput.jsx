import { SendHorizonal, Upload } from "lucide-react";
import React from "react";
import { useChat } from "../../zustand/useChat";

const ChatInput = () => {
  const [text, setText] = React.useState("");
  const { sendMessage } = useChat();
  const [selectedImg, setSelectedImg] = React.useState(null);
  const imgRef = React.useRef(null);

  const handleMessage = () => {
    if (text === "" && !selectedImg) return;
    sendMessage({
      text: text.trim(),
      image: selectedImg,
    });
    setText("");
    setSelectedImg(null);
    if (imgRef.current) imgRef.current.value = "";
  };

  const handleImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = reader.result;
      setSelectedImg(img);
    };
  };

  return (
    <section className="gap-1 items-center bottom-0 absolute right-0 left-0 m-3 flex p-2">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={imgRef}
        onChange={handleImg}
      />

      <button
        className="btn btn-soft btn-secondary"
        onClick={() => imgRef.current.click()}
      >
        <Upload />
      </button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input input-md md:input-lg w-full overflow-auto"
        type="text"
        placeholder="type message..."
      />
      <button onClick={handleMessage} className=" btn btn-neutral btn-dash">
        <SendHorizonal />
      </button>
    </section>
  );
};

export default ChatInput;
