import { useChat } from "../zustand/useChat";
import Loading from "../Components/Loading.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { UserRoundPen } from "lucide-react";

const TabsSection = () => {
  const {
    proceding,
    partners,
    Partners,
    Contacts,
    contacts,
    activeTab,
    setActive,
    selectedUser,
    setSelectedUser,
  } = useChat();

  useEffect(() => {
    Partners();
  }, []);

  return (
    <main className="">
      <div className="m-4 mx-auto grid grid-cols-1 md:grid-cols-2">
        <button
          onClick={() => {
            setActive("chats");
            Partners();
          }}
          className={`btn  hover:btn-soft ${activeTab === "chats" ? "btn-primary" : ""}`}
        >
          Chats
        </button>

        <button
          onClick={() => {
            setActive("contacts");
            Contacts();
          }}
          className={`btn  ${activeTab === "contacts" ? "btn-primary" : ""}`}
        >
          Contacts
        </button>
      </div>

      <div className="flex flex-col overflow-y-scroll max-h-[600px] md:max-h-[890px]">
        {proceding ? (
          <Loading />
        ) : (
          <>
            {activeTab === "chats" ? (
              <>
                {Array.isArray(partners) &&
                  partners.map((item) => {
                    return (
                      <button
                        onClick={() => setSelectedUser(item)}
                        key={item._id}
                        className={`btn mt-3 hover:btn-info relative p-5 flex justify-start items-center h-20 md:h-30  align-center
                        ${selectedUser?._id === item._id ? "btn-primary" : ""} `}
                      >
                        <div className="avatar ">
                          {item.profilePic ? (
                            <img
                              src={item.profilePic}
                              alt={item.fullName}
                              className="h-10 w-10 rounded-full md:h-20 md:w-20"
                            />
                          ) : (
                            <UserRoundPen className="md:size-10" />
                          )}
                        </div>
                        <div className="">{item.fullName}</div>
                      </button>
                    );
                  })}
              </>
            ) : (
              <>
                {Array.isArray(contacts) &&
                  contacts.map((item) => {
                    return (
                      <button
                        onClick={() => setSelectedUser(item)}
                        key={item._id}
                        className={`btn h-20 md:h-30 mt-3 hover:btn-info relative p-5 flex justify-start items-center align-center 
                          ${selectedUser?._id === item._id ? "btn-primary" : ""} `}
                      >
                        <div
                          className={`avatar avatar-online w-10 h-10 md:w-30 md:h-30 rounded-full grid place-content-center`}
                        >
                          {item.profilePic ? (
                            <img
                              src={item.profilePic}
                              alt={item.fullName}
                              className="h-10 w-10 rounded-full md:h-20 md:w-20"
                            />
                          ) : (
                            <UserRoundPen className="md:size-10" />
                          )}
                        </div>
                        <div className="truncate">{item.fullName}</div>
                      </button>
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
