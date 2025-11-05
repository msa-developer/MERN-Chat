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
          <img src={user.profilePic} />
          {user.fullName}
        </button>
      ))}
    </>
  );
};

export default PartnersList;
