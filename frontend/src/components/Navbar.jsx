import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const { token, role, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  const navStyle = ({ isActive }) =>

    isActive

      ? "px-3 py-2 rounded-lg border-2 border-white bg-white text-blue-600 font-semibold"

      : "px-3 py-2 rounded-lg hover:bg-blue-700 transition";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="font-bold text-xl">

        HomeAssist
      </h1>

      <div className="flex gap-3">

        {/* Not logged in */}

        {!token && (
          <>
            <NavLink to="/login" className={navStyle}>

              Login
            </NavLink>

            <NavLink to="/register" className={navStyle}>

              Register
            </NavLink>
          </>

        )}

        {/* Customer */}

        {token && role === "customer" && (
          <>
            <NavLink to="/dashboard" className={navStyle}>

              Dashboard
            </NavLink>

            <NavLink to="/providers" className={navStyle}>

              Providers
            </NavLink>

            <NavLink to="/bookings" className={navStyle}>

              Bookings
            </NavLink>

            <NavLink to="/profile" className={navStyle}>

              Profile
            </NavLink>
          </>

        )}

        {/* Provider */}

        {token && role === "provider" && (
          <>
            <NavLink to="/provider-dashboard" className={navStyle}>

              Dashboard
            </NavLink>

            <NavLink to="/provider-profile" className={navStyle}>

              Profile
            </NavLink>
          </>

        )}

        {/* Logout */}

        {token && (
          <button

            onClick={handleLogout}

            className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600"
          >

            Logout
          </button>

        )}
      </div>
    </nav>

  );

};

export default Navbar;
