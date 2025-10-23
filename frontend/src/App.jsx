import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./Pages/ChatPage";
import useAuth from "./zustand/useAuth";
import { useEffect } from "react";
import LoginPage from "./Pages/LoginPage.jsx";
import SignInPage from "./Pages/SignInPage.jsx";

const App = () => {
  const { user, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  console.log("user is : ", user);

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
          path="/singnIn"
          element={!user ? <SignInPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
