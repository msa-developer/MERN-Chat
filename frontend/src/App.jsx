import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "./zustand/useAuth";
import ChatPage from "./Pages/ChatPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import React from "react";

const App = () => {
  const { authUser, checkAuth } = useAuth();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen" data-theme="garden">
      <Routes>
        <Route
          path={"/"}
          element={authUser ? <ChatPage /> : <Navigate to="/register" />}
        />
        <Route
          path={"/login"}
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route
          path={"/register"}
          element={!authUser ? <RegisterPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
