import { useEffect, useState } from "react";
import API from "../api/axios";
import * as LucideIcons from "lucide-react";
import {
  Home,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
const [showServices, setShowServices] = useState(false);

const [services, setServices] = useState([]);

useEffect(() => {
  fetchServices();
}, []);

const fetchServices = async () => {
  try {
    const response = await API.get("/service-types");

    console.log(response.data);

    setServices(response.data);
  } catch (error) {
    console.log(error);
  }
};

return ( <div className="min-h-screen bg-gray-100 p-6">
{/* Welcome Card */} <div className="bg-gradient-to-r from-blue-50 to-blue-200 rounded-3xl shadow-lg p-8 mb-12"> <div className="grid md:grid-cols-2 gap-8 items-center">
{/* Left Side */} <div> <p className="text-blue-600 font-semibold text-lg mb-2">
Welcome to </p>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          HomeAssist
        </h1>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your Trusted Home Service Partner
        </h2>

        <p className="text-gray-700 text-lg mb-6">
          Book reliable professionals for plumbing, electrical work,
          carpentry, painting and more. Find trusted service providers
          near you and manage all your bookings easily.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowServices(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            Explore Services
          </button>

          {/* <button className="bg-white border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:shadow-md transition-all duration-300 cursor-pointer">
            View Bookings
          </button> */}
        </div>

        <div className="flex flex-wrap gap-6 mt-8">
          <div className="flex items-center gap-2 text-blue-700 font-medium">
            <ShieldCheck size={18} />
            Trusted Professionals
          </div>

          <div className="flex items-center gap-2 text-blue-700 font-medium">
            <Calendar size={18} />
            Easy Booking
          </div>

          <div className="flex items-center gap-2 text-blue-700 font-medium">
            <Home size={18} />
            Affordable Services
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="hidden md:flex justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3590/3590244.png"
          alt="Home Services"
          className="w-80 hover:scale-105 transition duration-500"
        />
      </div>
    </div>
  </div>

  {/* Services Section - Hidden Initially */}
  {showServices && (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Popular Services
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => {
          const Icon = LucideIcons[service.icon_name]|| LucideIcons.Circle;

          return (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-6 text-center"
          >
            <div className="flex justify-center text-blue-600 mb-4">
            <Icon size={40} />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {/* {serviceIcons[service.service_name] || service.service_name} */}
            {service.service_name}
            </h3>

            <p className="text-gray-600 text-sm mb-5">
            {service.description || "Professional home service"}
            </p> 

            <button
            onClick={() =>
              navigate(`/providers/${service.id}`) 
            }
             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              Book Now
            </button>
          </div>
                );
              })}
      </div>
    </section>
  )}
</div>

);
};

export default Dashboard;
