import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
  Calendar,
  Wrench,
  Receipt,
  Search,
} from "lucide-react";

const MyBookings = () => {

const [bookings, setBookings] = useState([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);

const navigate = useNavigate();

const fetchBookings = async () => {
  try {
    const res = await API.get("/bookings");
    console.log("Bookings fetched:", res.data);

    setBookings(res.data.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
const cancelBooking = async (id) => {
  try {
    await API.delete(`/bookings/${id}`);
    fetchBookings();
  } catch (error) {
    console.error(error);
  }
};
 const badgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Accepted":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      default:
        return "bg-red-100 text-red-700";
    }
  };
  const filteredBookings = bookings.filter(
    (item) =>
      item.service.toLowerCase().includes(search) ||
     // item.provider.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toString().includes(search.toLowerCase())
  );
  
  const total = bookings.length;
  const accepted = bookings.filter((b) => b.status === "Accepted").length;
  const pending = bookings.filter((b) => b.status === "Pending").length;
  const completed = bookings.filter((b) => b.status === "Completed").length;
  useEffect(() => {
    fetchBookings();
  }, []); 

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        My Bookings
      </h1>

      {/* Stats */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Total Bookings</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {total}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Active</h2>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {accepted}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Pending</h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">
            {pending}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Completed</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {completed}
          </p>
        </div>
      </div>

      {/* Search */}

      <div className="relative max-w-md mb-8">

        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search Booking..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3  rounded-xl border bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

      {/* Booking Cards */}

      <div className="grid gap-6">

        {filteredBookings.map((booking) => (  
          <div
            key={booking.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between gap-5">

              <div className="space-y-3">

                <h2 className="text-xl font-bold text-gray-800">
                  {booking.service}
                </h2>

                <div className="flex items-center gap-2 text-gray-600">
                  <Receipt size={18} />
                  Booking ID :
                  <span className="font-semibold">{booking.id}</span>
                </div>

                

                <div className="flex items-center gap-2 text-gray-600">
                  <Wrench size={18} />
                  {booking.service}
                </div>



                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  {new Date(booking.booking_date).toLocaleDateString()}
                </div>

                
              </div>

              <div className="flex flex-col justify-between items-start lg:items-end">

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>

                <div className="mt-6 flex gap-3">

                {/* <button
                 onClick={() => navigate(`/bookings/${booking.id}`)}
                 className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                 View
                </button>  */}

                  {booking.status !== "Completed" &&
                    booking.status !== "Cancelled" && (
                      <button
                      onClick={() => cancelBooking(booking.id)}
                      className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                      Cancel
                    </button>
                    )}

                </div>

              </div>

            </div>
          </div>
        ))}
        {filteredBookings.length === 0 && (
    <div className="text-center text-gray-500 text-xl mt-10">
      No bookings found.
    </div>
  )}

      </div>

    </div>
  );
};

export default MyBookings;