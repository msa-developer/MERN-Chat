import toast from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./Pages/ChatPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignInPage from "./Pages/SignInPage.jsx";
import useAuth from "./zustand/auth.js";
import { useEffect } from "react";

const App = () => {
  const { user, checkUser } = useAuth();
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="min-h-screen" data-theme="night">
      <Routes>
        <Route
          path="/"
          element={user ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignInPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
