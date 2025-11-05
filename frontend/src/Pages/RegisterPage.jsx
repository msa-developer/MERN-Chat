import React from "react";

const RegisterPage = () => {
  const { data, setData } = React.useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return <div className="bg-red-900 "></div>;
};

export default RegisterPage;
