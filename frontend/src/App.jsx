import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./Pages/Chat.jsx";
import Login from "./Pages/Login.jsx";
import SignIn from "./Pages/SignIn.jsx";
import { useAuth } from "./zustand/useAuth.js";
import { useEffect } from "react";
import Loading from "./Components/Loading.jsx";

const App = () => {
  const { user, loading, checkAuthentication } = useAuth();

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen relative" data-theme="night">
      <Routes>
        <Route
          path={"/"}
          element={user ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path={"/login"}
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path={"/signin"}
          element={!user ? <SignIn /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
