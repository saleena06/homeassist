import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";


const Providers = () => {
  const { serviceid } = useParams();
  console.log("serviceid =", serviceid);

  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const [bookingData, setBookingData] = useState({
    date: "",
    description: "",
  });


  const fetchProviders = async () => {
    try {

      let url = "/providers";

      if (serviceid) {
        url = `/providers?serviceid=${serviceid}`;
      }

      const response = await API.get(url);

      setProviders(response.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProviders();
  }, [serviceid]);



  const filteredProviders = providers;
  if (loading) {
    return (
      <h2 className="text-center mt-10 text-xl">
        Loading providers...
      </h2>
    );
  }
  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };
  const handleBooking = async () => {
    try {
      const user = localStorage.getItem("user");
      const user_id = JSON.parse(user).id;
      console.log("userid",user_id);
      console.log(typeof user_id);
  
      await API.post("/service-requests", {
        user_id,
        provider_id: selectedProvider.id,
        date: bookingData.date,
        description: bookingData.description,
      });
  
      alert("Booking request sent successfully.");
  
      setShowModal(false);
  
      setBookingData({
        date: "",
        description: "",
      });
  
    } catch (error) {
      console.log(error);
      alert("Booking failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 capitalize">
        {serviceid ? "Providers" : "All Providers"}
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {provider.name}
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Phone:</strong> {provider.phone}
              </p>

              <p>
                <strong>Email:</strong> {provider.email}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {provider.experience_years} Years
              </p>

              <p>
                <strong>City:</strong> {provider.city}
              </p>

              <p>
                <strong>Address:</strong> {provider.address}
              </p>

              <p>
                <strong>Rating:</strong> ⭐ {provider.rating}
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedProvider(provider);
                setShowModal(true);
              }}
              className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Book Provider
            </button>
          </div>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="text-center text-gray-500 text-xl mt-10">
          No providers available for this service.
        </div>
      )}
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-96">

      <h2 className="text-2xl font-bold mb-4">
        Book Provider
      </h2>

      <label className="block mb-2">
        Booking Date
      </label>

      <input
        type="date"
        name="date"
        value={bookingData.date}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2">
        Description
      </label>

      <textarea
        name="description"
        value={bookingData.description}
        onChange={handleChange}
        rows="4"
        className="w-full border p-2 rounded mb-4"
      ></textarea>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleBooking}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Book Now
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default Providers;