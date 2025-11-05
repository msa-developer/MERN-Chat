import React from "react";
import { useAuth } from "../zustand/useAuth";
import { Link } from "react-router";

const LoginPage = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const { LoginUser, loggingin } = useAuth();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="grid place-content-center min-h-screen">
      <div className="card w-96 bg-base-100 card-xl md:w-xl shadow-sm">
        <div className="card-body">
          <h1 className="card-title">Login Now</h1>

          <h2 className="card-title">Email</h2>
          <p>
            <input
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email..."
              name="email"
              className="input input-md md:input-lg w-full"
            />
          </p>

          <h2 className="card-title">Password</h2>
          <p>
            <input
              value={data.password}
              onChange={handleChange}
              type="password"
              placeholder="password..."
              name="password"
              className="input input-md md:input-lg w-full"
            />
          </p>

          <div className="card-actions w-full">
            <button
              className="btn btn-primary w-full md:text-lg"
              onClick={() => LoginUser(data)}
            >
              {loggingin ? (
                <>
                  <span className="loading loading-spinner loading-sm md:loading-lg"></span>
                  Loggingin...
                </>
              ) : (
                "Login"
              )}
            </button>
            <Link to="/register" className="w-full ">
              <button className="w-full btn btn-soft btn-secondary md:text-lg">
                If You Don't Have An Account Then Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
