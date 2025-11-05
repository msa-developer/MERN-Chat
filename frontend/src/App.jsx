import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "./zustand/useAuth";
import ChatPage from "./Pages/ChatPage/ChatPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import React, { Activity } from "react";
import Slidebar from "./Pages/ChatPage/Slidebar.jsx";
import { useSlide } from "./zustand/slide.js";

const App = () => {
  const { authUser, checkAuth } = useAuth();
  const { show } = useSlide();

  React.useEffect(() => {
    checkAuth();
  }, []);

  console.log("show is : ", show);

  return (
    <main className="min-h-screen" data-theme="garden">
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

      <Activity mode={show ? "visible" : "hidden"}>
        <Slidebar />
      </Activity>
    </main>
  );
};

export default App;
