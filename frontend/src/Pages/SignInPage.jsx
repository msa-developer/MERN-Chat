import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../zustand/auth";

const SignupPage = () => {
  const [information, setInformation] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { loading, signin } = useAuth();
  const handleSignIn = () => {
    signin(information);
  };
  return (
    <main className="flex items-center justify-center h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-2xl border p-4">
        <legend className="fieldset-legend text-lg">SignIn</legend>

        <label className="label text-xl">FullName</label>
        <input
          value={information.fullName}
          onChange={(e) =>
            setInformation({ ...information, fullName: e.target.value })
          }
          type="text"
          className="input text-xl w-lg"
          placeholder="fullName..."
        />

        <label className="label text-xl">Email</label>
        <input
          value={information.email}
          onChange={(e) =>
            setInformation({ ...information, email: e.target.value })
          }
          type="email"
          className="input text-xl w-lg"
          placeholder="Email..."
        />

        <label className="label text-xl">Password</label>
        <input
          value={information.password}
          onChange={(e) =>
            setInformation({ ...information, password: e.target.value })
          }
          type="password"
          className="input w-lg text-xl"
          placeholder="Password..."
        />

        <button className="btn btn-primary my-4 text-xl" onClick={handleSignIn}>
          {loading ? "SigningIn..." : "SignIn"}
        </button>
        <Link className="w-full" to="/login">
          <button className="btn w-full text-lg btn-success ">
            Already Have An Account Login
          </button>
        </Link>
      </fieldset>
    </main>
  );
};

export default SignupPage;
