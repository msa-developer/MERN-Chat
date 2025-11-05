import { PanelRightClose } from "lucide-react";
import { useSlide } from "../../zustand/slide";

const ChatHeader = () => {
  const { setShowTrue, show } = useSlide();

  return (
    <div>
      <header>
        {!show && (
          <button className="btn btn-soft btn-secondary" onClick={setShowTrue}>
            <PanelRightClose />
          </button>
        )}
      </header>
    </div>
  );
};

export default ChatHeader;
