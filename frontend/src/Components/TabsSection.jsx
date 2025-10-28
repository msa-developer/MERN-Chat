import { useChat } from "../zustand/useChat";
import Loading from "../Components/Loading.jsx";
import { useState } from "react";

const TabsSection = () => {
  const { proceding, partners, Partners, Contacts, contacts } = useChat();
  const [active, setActive] = useState("chats");

  return (
    <main className="h-[80%]">
      <div className="flex  gap-2 flex-wrap m-4 mx-auto justify-around">
        <button
          onClick={() => {
            setActive("chats");
            Partners();
          }}
          className={`btn hover:btn-soft ${active === "chats" ? "btn-primary" : ""}`}
        >
          Chats
        </button>

        <button
          onClick={() => {
            setActive("contacts");
            Contacts();
          }}
          className={`btn ${active === "contacts" ? "btn-primary" : ""}`}
        >
          Contacts
        </button>
      </div>

      <div className="h-full flex flex-col overflow-y-auto">
        {proceding ? (
          <Loading />
        ) : (
          <>
            {contacts.map((item) => {
              return (
                <button key={item._id} className="btn btn-info">
                  {item.fullName}
                </button>
              );
            })}

            {partners.map((item) => {
              return (
                <button key={item._id} className="btn btn-info">
                  {item.fullName}
                </button>
              );
            })}
          </>
        )}
      </div>
    </main>
  );
};

export default TabsSection;
