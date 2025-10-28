import { useChat } from "../zustand/useChat";
import Loading from "../Components/Loading.jsx";
import { useState } from "react";
import { Link } from "react-router";

const TabsSection = () => {
  const { proceding, partners, Partners, Contacts, contacts } = useChat();
  const [active, setActive] = useState("chats");

  return (
    <main className="h-[80%]">
      <div className="flex  gap-2 flex-wrap  m-4 mx-auto justify-around">
        <button
          onClick={() => {
            setActive("chats");
            Partners();
          }}
          className={`btn  hover:btn-soft ${active === "chats" ? "btn-primary" : ""}`}
        >
          Chats
        </button>

        <button
          onClick={() => {
            setActive("contacts");
            Contacts();
          }}
          className={`btn  ${active === "contacts" ? "btn-primary" : ""}`}
        >
          Contacts
        </button>
      </div>

      <div className="h-full flex flex-col overflow-y-auto">
        {proceding ? (
          <Loading />
        ) : (
          <>
            {active === "chats" ? (
              <>
                {partners.map((item) => {
                  return (
                    <Link className="w-full " to={`${item._id}`}>
                      <button
                        key={item._id}
                        className="btn mt-1 w-full btn-info"
                      >
                        {item.fullName}
                      </button>
                    </Link>
                  );
                })}
              </>
            ) : (
              <>
                {contacts.map((item) => {
                  return (
                    <Link className="w-full " to={`${item._id}`}>
                      <button
                        key={item._id}
                        className="btn mt-1 w-full btn-info"
                      >
                        {item.fullName}
                      </button>
                    </Link>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default TabsSection;
