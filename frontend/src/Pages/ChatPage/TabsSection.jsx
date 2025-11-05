const TabsSection = () => {
  return (
    <div className="grid grid-cols-2 gap-2 m-2">
      <button className={`btn btn-outline text-white  btn-primary`}>
        Chats
      </button>
      <button className={`btn btn-outline text-white btn-primary`}>
        Contacts
      </button>
    </div>
  );
};

export default TabsSection;
