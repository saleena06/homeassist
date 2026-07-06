import { useEffect, useState } from "react";
import API from "../api/axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const [loading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await API.get("/profile");
      console.log("Response from profile API:", response);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow rounded-lg p-8">

      <h2 className="text-3xl font-bold mb-6">
        My Profile
      </h2>

      <div className="space-y-3">

        <p><strong>Name:</strong> {profile.name}</p>

        <p><strong>Email:</strong> {profile.email}</p>

        <p><strong>Phone:</strong> {profile.phone}</p>

        <p><strong>Role:</strong> {profile.role}</p>

        <p><strong>City:</strong> {profile.city}</p>

        <p><strong>Address:</strong> {profile.address}</p>

        <p><strong>Date of Birth:</strong> {profile.date_of_birth}</p>

        <p><strong>Gender:</strong> {profile.gender}</p>

      </div>

    </div>
  );
};

export default Profile;