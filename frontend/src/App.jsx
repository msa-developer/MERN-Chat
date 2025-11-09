import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "./zustand/useAuth";
import ChatPage from "./Pages/ChatPage/ChatPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import React from "react";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";

const App = () => {
  const { authUser, checkAuth } = useAuth();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <main className="min-h-screen" data-theme="garden">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path={"/chat"}
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path={"/login"}
          element={!authUser ? <LoginPage /> : <Navigate to="/chat" />}
        />

        <Route
          path={"/register"}
          element={!authUser ? <RegisterPage /> : <Navigate to="/chat" />}
        />
      </Routes>
    </main>
  );
};

export default App;
