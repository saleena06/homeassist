import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Options from "../components/Options";
import ExperienceInput from "../components/ExperienceInput";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
    city: "",
    address: "",
    date_of_birth: "",
    service_type_id: "",
    experience_years: "",
    gender: "male",
  });
  // console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/signup", formData);

      console.log(response.data);

      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error);

      alert(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-4"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-4"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-4"
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-4"
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-4"
          rows="3"
          required
        />

        <label className="block mb-1 font-medium">
          Date of Birth
        </label>

        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-4"
        />

        <label className="block mb-1 font-medium">
          Gender
        </label>

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-4"
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label className="block mb-1 font-medium">
          Register As
        </label>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-6"
        >
          <option value="customer">Customer</option>
          <option value="provider">Provider</option>
        </select>

        {formData.role === "provider" && (
          <Options
            value={formData.service_type_id}
            onChange={handleChange}
          />
          
        )}
        <ExperienceInput
  formData={formData}
  handleChange={handleChange}
/>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;