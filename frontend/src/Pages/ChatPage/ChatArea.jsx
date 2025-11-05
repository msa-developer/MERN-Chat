import { PanelRightClose } from "lucide-react";
import { useSlide } from "../../zustand/slide";

const ChatArea = () => {
  const { setShow } = useSlide();
  return (
    <main>
      <header>
        <button className="btn btn-soft btn-secondary" onClick={setShow}>
          <PanelRightClose />
        </button>
      </header>
    </main>
  );
};

export default ChatArea;
