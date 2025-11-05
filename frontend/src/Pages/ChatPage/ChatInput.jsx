import { SendHorizonal, Upload } from "lucide-react";

const ChatInput = () => {
  return (
    <section className="gap-1 items-center bottom-0 absolute right-0 left-0 m-3 flex p-2">
      <button className="btn btn-soft btn-secondary">
        <Upload />
      </button>
      <input
        className="input input-md md:input-lg w-full "
        type="text"
        placeholder="type message..."
      />
      <button className=" btn btn-neutral btn-dash">
        <SendHorizonal />
      </button>
    </section>
  );
};

export default ChatInput;
