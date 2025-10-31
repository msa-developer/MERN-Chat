import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../zustand/useAuth";

const SignIn = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signin, signingIn } = useAuth();

  return (
    <main className="min-h-screen grid place-content-center p-3">
      <div className="card border card-border bg-base-200 border-base-300 lg:w-6xl md:w-2xl  lg:p-3 ">
        <div className="card-body p-3 md:p-5">
          <h2 className="card-title text-lg">Full Name </h2>
          <p>
            <input
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
              type="fullName..."
              placeholder="Type here"
              className="input w-full text-lg"
            />
          </p>

          <h2 className="card-title text-lg">Email</h2>
          <p>
            <input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="email"
              placeholder="Email..."
              className="input w-full text-lg"
            />
          </p>

          <h2 className="card-title text-lg">Password</h2>
          <p>
            <input
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              placeholder="password..."
              className="input w-full text-lg"
            />
          </p>

          <div className="card-actions w-full">
            <button
              onClick={() => {
                signin(data);
              }}
              disabled={signingIn}
              className="btn btn-primary w-full mt-5"
            >
              {signingIn ? (
                <>
                  <span className="loading loading-spinner"></span>
                  SignningIn...
                </>
              ) : (
                "SignIn"
              )}
            </button>

            <Link to="/login" className="w-full">
              <button className="btn btn-dash btn-secondary w-full text-md">
                If You Already Have An Account Then Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
