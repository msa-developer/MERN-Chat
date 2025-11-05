import { PanelRightClose } from "lucide-react";
import { useSlide } from "../../zustand/slide";

const ChatHeader = () => {
  const { setShowTrue, show } = useSlide();

  return (
    <section>
      <header>
        {!show && (
          <button className="btn btn-soft btn-secondary" onClick={setShowTrue}>
            <PanelRightClose />
          </button>
        )}
      </header>
    </section>
  );
};

export default ChatHeader;
