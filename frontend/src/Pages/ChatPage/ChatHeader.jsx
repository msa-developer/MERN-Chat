import { PanelRightClose } from "lucide-react";
import { useSlide } from "../../zustand/slide";

const ChatHeader = () => {
  const { setShow } = useSlide();

  return (
    <div>
      <header>
        <button className="btn btn-soft btn-secondary" onClick={setShow}>
          <PanelRightClose />
        </button>
      </header>
    </div>
  );
};

export default ChatHeader;
