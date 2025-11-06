import React from "react";
import { useChat } from "../../zustand/useChat";
import { UserPen } from "lucide-react";
import { useAuth } from "../../zustand/useAuth";

const ContactList = () => {
  const { selectedUser, setSelectedUser, contacts, getContacts } = useChat();
  const { onlineUsers } = useAuth();
  React.useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      {contacts.map((user, index) => (
        <button
          className={`btn  p-12 m-2 overflow-hidden btn-dash btn-info ${selectedUser?._id === user._id ? "btn-active" : ""}`}
          onClick={() => setSelectedUser(user)}
          key={index}
        >
          <div
            className={`avatar ${onlineUsers?.includes(user?._id) ? "avatar-online" : ""} `}
          >
            {user.profilePic ? (
              <img
                src={user?.profilePic}
                className="object-cover w-20  h-20 rounded-full"
              />
            ) : (
              <UserPen size={40} />
            )}
          </div>
          <span className="md:text-lg truncate  max-w-[180px] md:max-w-[400px]">
            {user?.fullName}
          </span>
        </button>
      ))}
    </>
  );
};

export default ContactList;
