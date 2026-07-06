import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  LogOut,
  Home,
} from "lucide-react";

const ProviderLayout = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <Home className="text-blue-600" size={30} />
            <h1 className="text-2xl font-bold text-blue-600">
              HomeAssist
            </h1>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink
            to="/provider-dashboard"
            className={linkStyle}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/provider-profile"
            className={linkStyle}
          >
            <User size={20} />
            Profile
          </NavLink>

          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-100"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </aside> */}

      {/* Page Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default ProviderLayout;