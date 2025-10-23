import { useState } from "react";
import useAuth from "../zustand/auth.js";
import { Link } from "react-router";

const LoginPage = () => {
  const [information, setInformation] = useState({
    email: "",
    password: "",
  });
  const { loading, login } = useAuth();
  const handleLogin = () => {
    login(information);
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="card w-lg bg-base-100  border-2 border-primary border-double  card-xl shadow-sm">
        <div className="card-body ">
          <h2 className="card-title">Email</h2>
          <p>
            <input
              value={information.email}
              onChange={(e) =>
                setInformation({ ...information, email: e.target.value })
              }
              type="text"
              placeholder="Email..."
              className="input w-md input-primary text-lg"
            />
          </p>

          <h2 className="card-title">Password</h2>
          <p>
            <input
              value={information.password}
              onChange={(e) =>
                setInformation({ ...information, password: e.target.value })
              }
              type="password"
              placeholder="Password..."
              className="input input-primary text-lg w-md"
            />
          </p>

          <div className="flex flex-column card-actions">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="text-xl btn w-full my-3 btn-primary px-12"
            >
              {loading ? "Login..." : "Login"}
            </button>

            <Link className="w-full" to="/signup">
              <button className="btn text-lg w-full btn-success ">
                Don't Have An Account Then SignIn
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
