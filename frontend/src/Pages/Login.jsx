import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../zustand/useAuth";

const Login = () => {
  const { loggingIn, login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="h-screen grid place-content-center relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(data);
        }}
        className="w-sm max-w-md max-auto"
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="fieldset-legend text-xl">Login</legend>

          <label className="label text-xs sm:text-lg">Email</label>
          <input
            type="email"
            className="input w-full"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <label className="label text-lg">Password</label>
          <input
            type="password"
            className="input w-full"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loggingIn}
            className="btn btn-neutral mt-4 text-md"
          >
            {loggingIn ? (
              <>
                <span className="loading loading-spinner"></span>
                LoggingIn...
              </>
            ) : (
              "LogIn"
            )}
          </button>
          <Link to="/signin" className="w-full">
            <button className="btn btn-dash btn-secondary w-full text-md">
              If You Are New Then SignIn
            </button>
          </Link>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
