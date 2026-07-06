// src/pages/Services.jsx

import React, { useState } from "react";
import {
  Search,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const Services = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  


  const services = [
    {
      id: 1,
      title: "Plumber",
      icon: <Wrench size={40} />,
      description: "Professional plumbing services for homes and offices.",
    },
    {
      id: 2,
      title: "Electrician",
      icon: <Zap size={40} />,
      description: "Expert electrical repair and installation services.",
    },
    {
      id: 3,
      title: "Carpenter",
      icon: <Hammer size={40} />,
      description: "Custom furniture and woodwork solutions.",
    },
    {
      id: 4,
      title: "Painter",
      icon: <Paintbrush size={40} />,
      description: "Interior and exterior painting services.",
    },
  ];

    // const filteredServices = services.filter((service) =>
    //   service.title.toLowerCase().includes(search.toLowerCase())
    // );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Heading */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Our Services
        </h1>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-10">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center"
            >
              <div className="flex justify-center text-blue-600 mb-4">
                {service.icon}
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4">
                {service.description}
              </p>

              <button
               onClick={() =>
                navigate(`/providers/${service.id}`)
              }
               className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-lg active:scale-95"
              >
               Book Now
               </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center mt-10 text-gray-500 text-lg">
            No services found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;