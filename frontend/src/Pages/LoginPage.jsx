import { useState } from "react";
import useAuth from "../zustand/useAuth.js";
import { Link } from "react-router";
const LoginPage = () => {
  const [data, setData] = useState({
    fullName: "",
    password: "",
  });

  const { login } = useAuth();
  const handleLogin = () => {
    login(data);
  };

  return (
    <main className=" min-h-screen grid place-items-center">
      <div className="card border-secondary card-border w-xl h-xl bg-base-100 card-xl shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Email</h2>
          <p>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="email..."
              className="input input-lg w-lg"
            />
          </p>
          <h2 className="card-title">Password</h2>
          <p>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="password..."
              className="input input-lg w-lg"
            />
          </p>
          <div className="justify-end card-actions">
            <button
              className="btn btn-primary w-full mt-3"
              onClick={handleLogin}
            >
              Login
            </button>
            <Link to="/singnIn" className="w-full">
              <button className="btn btn-dash btn-secondary w-full">
                If You're New Then SignIn
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
