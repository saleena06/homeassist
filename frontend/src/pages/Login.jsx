import { useState } from "react";

import API from "../api/axios";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",

    password: "", 
    role: "customer", // default selected
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "auth/signin",

        formData
      );

      const data = response.data;
      

      // save token + role through context

      login(data.token, data.user.role);

      // if (data.user.role === "provider") {
      //   localStorage.setItem("providerId", data.providerId);
      // } else {
      //   localStorage.setItem("userId", data.userId);
      // }

      // optional: save full user object if needed elsewhere

      localStorage.setItem(
        "user",

        JSON.stringify(data.user)
      );

      // redirect based on role

      if (data.user.role === "customer") {
        navigate("/dashboard");
      } else if (data.user.role === "provider") {
        navigate("/provider-dashboard");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);

      alert("Login Failed");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="w-96 border p-5 rounded">
        <h2 className="text-2xl mb-4">Login</h2>

        <div className="flex mb-4 border rounded overflow-hidden">
  <button
    type="button"
    onClick={() =>
      setFormData({
        ...formData,
        role: "customer",
      })
    }
    className={`w-1/2 p-2 ${
      formData.role === "customer"
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    Customer
  </button>

  <button
    type="button"
    onClick={() =>
      setFormData({
        ...formData,
        role: "provider",
      })
    }
    className={`w-1/2 p-2 ${
      formData.role === "provider"
        ? "bg-green-600 text-white"
        : "bg-gray-200"
    }`}
  >
    Provider
  </button>
</div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

        <button className="bg-green-600 text-white w-full p-2">Login</button>
      </form>
    </div>
  );
};

export default Login;
