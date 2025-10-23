import useAuth from "../zustand/auth";

const ChatPage = () => {
  const { loading, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <button
        disabled={loading}
        onClick={handleLogout}
        className="btn btn-primary"
      >
        {loading ? "LogginOut..." : "Logout"}
      </button>
    </div>
  );
};

export default ChatPage;
