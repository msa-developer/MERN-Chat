import React from "react";
import { useChat } from "../zustand/useChat";
import { SendHorizonal, Upload } from "lucide-react";
import toast from "react-hot-toast";

const ChatInput = () => {
  const [text, setText] = React.useState("");
  const { sendMessage, messageSending } = useChat();
  const [imagePreview, setImagePreview] = React.useState(null);

  const fileRef = React.useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("submitted your form");
    if (!text.trim() && !imagePreview) return;
    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = null;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("You Can Send Only Images");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64Image = reader.result;
      setImagePreview(base64Image);
    };
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <>
      <form onSubmit={handleSendMessage}>
        <section className="flex gap-2 flex-col md:flex-row justify-center items-center">
          <div className="flex gap-1 justify-center w-full items-center">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="btn rounded-full hover:btn-primary w-12 h-12 md:w-15 md:h-15"
            >
              <Upload />
            </button>

            <input
              type="text"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your Message..."
              className="input md:input-lg w-full"
            />
          </div>

          <button
            type="submit"
            className="btn bg-red-900 font-bold "
            disabled={messageSending}
          >
            <SendHorizonal />
          </button>
        </section>
      </form>
    </>
  );
};

export default ChatInput;
