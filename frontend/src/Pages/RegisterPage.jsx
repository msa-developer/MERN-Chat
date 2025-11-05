import React from "react";

const RegisterPage = () => {
  const [data, setData] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="grid place-content-center min-h-screen">
      <div className="card w-96 bg-base-100 card-xl md:w-xl shadow-sm">
        <div className="card-body">
          <h1 className="card-title">Register Now</h1>

          <h2 className="card-title">fullName</h2>
          <p>
            <input
              type="text"
              value={data.fullName}
              onChange={handleChange}
              placeholder="fullName..."
              name="fullName"
              className="input input-md md:input-lg w-full"
            />
          </p>

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
            <button className="btn btn-primary w-full">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
