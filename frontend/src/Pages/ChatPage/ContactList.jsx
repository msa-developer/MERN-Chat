import React from "react";
import { useChat } from "../../zustand/useChat";

const ContactList = () => {
  const { selectedUser, setSelectedUser, contacts, getContacts, tab } =
    useChat();
  React.useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      {contacts.map((user, index) => (
        <button
          className={`btn p-12 m-2 overflow-hidden btn-dash btn-info ${selectedUser?._id === user._id ? "btn-active" : ""}`}
          onClick={() => setSelectedUser(user)}
          key={index}
        >
          <img
            src={user.profilePic}
            className="object-cover w-20 h-20 rounded-full"
          />
          {user.fullName}
        </button>
      ))}
    </>
  );
};

export default ContactList;
