import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import {
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Wrench,
  Calendar,
} from "lucide-react";

const ProviderDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/providers/bookings");
      console.log("Response:", res.data);
      if (res.data.success) {
        setRequests(res.data.bookings);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const total = useMemo(() => requests.length, [requests]);

  const pending = useMemo(
    () =>
      requests.filter(
        (item) => item.status?.toLowerCase() === "pending"
      ).length,
    [requests]
  );

  const accepted = useMemo(
    () =>
      requests.filter(
        (item) => item.status?.toLowerCase() === "accepted"
      ).length,
    [requests]
  );

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/providers/bookings/${id}`, {
        status,
      });

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">
        Provider Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow p-6">
          <ClipboardList
            className="text-blue-600 mb-3"
            size={34}
          />

          <h2 className="text-gray-500">
            Total Requests
          </h2>

          <p className="text-3xl font-bold">
            {total}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <Clock
            className="text-yellow-500 mb-3"
            size={34}
          />

          <h2 className="text-gray-500">
            Pending
          </h2>

          <p className="text-3xl font-bold">
            {pending}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
  <CheckCircle
    className="text-green-600 mb-3"
    size={34}
  />

  <h2 className="text-gray-500">
    Accepted
  </h2>

  <p className="text-3xl font-bold">
    {accepted}
  </p>
</div>
      </div>

      {/* Requests Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="bg-blue-600 text-white px-6 py-4">
          <h2 className="text-xl font-semibold">
            Requests Received
          </h2>
        </div>

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Service
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {requests.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500"
                >
                  No Requests Found
                </td>

              </tr>

            ) : (

              requests.map((request) => (

                <tr
                  key={request.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-2">

                      <User size={18} />

                      {request.customer?.name || "Customer"}

                    </div>

                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-2">

                      <Wrench size={18} />

                      {request.description}

                    </div>

                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-2">

                      <Calendar size={18} />

                      {new Date(request.date).toLocaleDateString()} 

                    </div>

                  </td>

                  <td className="p-4">

                    <span
                     className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        request.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>

                  </td>

                  <td className="p-4 text-center">

                    {request.status === "pending" ? (

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            updateStatus(
                              request.id,
                              "accepted"
                            )
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                          Accept
                        </button>

                        

                      </div>

                    ) : (

                      <span className="text-gray-500">
                        No Action
                      </span>

                    )}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ProviderDashboard;