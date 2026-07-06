import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Wrench,
} from "lucide-react";

const ProviderProfile = () => {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile/provider");

      if (res.data.success) {
        setProvider(res.data.provider);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading Profile...
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Provider not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl">

        {/* Header */}

        <div className="bg-blue-600 text-white p-8 rounded-t-xl text-center">
          <div className="w-28 h-28 rounded-full bg-white text-blue-600 flex items-center justify-center mx-auto mb-4">
            <User size={55} />
          </div>

          <h1 className="text-3xl font-bold">
            {provider.name}
          </h1>

          <p className="mt-2">
            {provider.service_type || "Service Provider"}
          </p>
        </div>

        {/* Details */}

        <div className="p-8 space-y-6">

          <div className="flex items-center gap-4">
            <Mail className="text-blue-600" />
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-semibold">
                {provider.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-blue-600" />
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-semibold">
                {provider.phone || "Not Available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-blue-600" />
            <div>
              <p className="text-gray-500">Address</p>
              <p className="font-semibold">
                {provider.address || "Not Available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Briefcase className="text-blue-600" />
            <div>
              <p className="text-gray-500">Experience</p>
              <p className="font-semibold">
                {provider.experience || "Not Available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Wrench className="text-blue-600" />
            <div>
              <p className="text-gray-500">Service</p>
              <p className="font-semibold">
                {provider.service_type || "Not Available"}
              </p>
            </div>
          </div>

          {/* <div className="pt-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Edit Profile
            </button>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;