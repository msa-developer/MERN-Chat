import { useChat } from "../../zustand/useChat";
import PartnersList from "./PartnersList";
import ContactList from "./ContactList.jsx";

const List = () => {
  const { tab } = useChat();
  return (
    <section className="flex overflow-y-scroll p-3 flex-col h-full">
      {tab === "chats" ? <PartnersList /> : <ContactList />}
    </section>
  );
};

export default List;
