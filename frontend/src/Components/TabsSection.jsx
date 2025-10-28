const TabsSection = () => {
  return (
    <div>
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-box">
        <input
          type="radio"
          name="my_tabs_6"
          className="tab tab-xl px-8 py-4 text-xl"
          aria-label="Chats"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6 w-full">
          Tab content 1
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab tab-xl px-8 py-4 text-xl"
          aria-label="Contacts"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 2
        </div>
      </div>
    </div>
  );
};

export default TabsSection;
