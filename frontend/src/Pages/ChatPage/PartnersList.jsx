import React from "react";
import { useChat } from "../../zustand/useChat";
import { UserPen } from "lucide-react";

const PartnersList = () => {
  const { partners, selectedUser, setSelectedUser, getPartners } = useChat();

  React.useEffect(() => {
    getPartners();
  }, [getPartners]);

  return (
    <>
      {partners.map((user, index) => (
        <button
          className={`btn p-12 m-2 btn-dash btn-info ${selectedUser?._id === user._id ? "btn-active" : ""}`}
          onClick={() => setSelectedUser(user)}
          key={index}
        >
          {user.profilePic ? (
            <img
              src={user.profilePic}
              className="object-cover w-10 h-10 md:w-20 md:h-20 rounded-full"
            />
          ) : (
            <UserPen size={40} />
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
