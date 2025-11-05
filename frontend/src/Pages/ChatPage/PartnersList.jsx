import React from "react";
import { useChat } from "../../zustand/useChat";

const PartnersList = () => {
  const { partners, selectedUser, setSelectedUser, getPartners } = useChat();

  React.useEffect(() => {
    getPartners();
  }, []);

  return (
    <>
      {partners.map((user, index) => (
        <button
          className={`btn m-2 btn-dash btn-info ${selectedUser?._id === user._id ? "btn-active" : ""}`}
          onClick={() => setSelectedUser(user)}
          key={index}
        >
          {user.profilePic ? (
            <img
              src={user.profilePic}
              className="object-cover w-20 h-20 rounded-full"
            />
          ) : (
            <UserPen />
          )}
          <span className="md:text-lg truncate  max-w-[180px] md:max-w-[400px]">
            {user.fullName}
          </span>
        </button>
      ))}
    </>
  );
};

export default PartnersList;
