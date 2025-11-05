import { useChat } from "../../zustand/useChat";
import PartnersList from "./PartnersList.jsx";
import ContactList from "./PartnersList.jsx";

const TabsSection = () => {
  const { tab, setTab } = useChat();
  return (
    <div className="grid grid-cols-2 gap-2 m-2">
      <button
        onClick={() => setTab("chats")}
        className={`btn text-white   ${tab === "chats" ? "btn-info" : " btn-outline "}`}
      >
        Chats
      </button>
      <button
        onClick={() => setTab("contacts")}
        className={`btn text-white ${tab !== "chats" ? "btn-info" : " btn-outline "}`}
      >
        Contacts
      </button>
    </div>
  );
};

export default TabsSection;
