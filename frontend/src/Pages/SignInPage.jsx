import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../zustand/useAuth";

const SignInPage = () => {
  const { signIn } = useAuth();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    signIn(data);
  };
  return (
    <main className=" min-h-screen grid place-items-center">
      <div className="card border-secondary card-border w-xl h-xl bg-base-100 card-xl shadow-sm">
        <div className="card-body">
          <h2 className="card-title">FullName</h2>
          <p>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
              placeholder="fullName..."
              className="input input-lg w-lg"
            />
          </p>

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
              onClick={handleSignIn}
            >
              SignIn
            </button>
            <Link to="/login" className="w-full">
              <button className="btn btn-dash btn-secondary w-full">
                Already Have An Account Then Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
