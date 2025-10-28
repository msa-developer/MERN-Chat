import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../zustand/useAuth";

const Login = () => {
  const { loggingIn, login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="min-h-screen grid place-content-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(data);
        }}
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg h-lg border p-4">
          <legend className="fieldset-legend text-xl">Login</legend>

          <label className="label text-lg">Email</label>
          <input
            type="email"
            className="input w-sm"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Email"
          />

          <label className="label text-lg">Password</label>
          <input
            type="password"
            className="input w-sm"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
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
