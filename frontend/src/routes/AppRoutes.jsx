import { Routes, Route,Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../components/Services.jsx";
import Providers from "../pages/Providers";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import MyBookings from "../pages/MyBookings";
import ProviderDashboard from "../pages/ProviderDashboard";
import ProviderProfile from "../pages/ProviderProfile";
import ProviderLayout from "../components/ProviderLayout";
import ProtectedProviderRoute from "../components/ProtectedProviderRoute";
import Navbar from "../components/Navbar";

const AppRoutes = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        }
      />
      

      <Route
        path="/providers/:serviceid"
        element={
          <ProtectedRoute>
            <Providers />
          </ProtectedRoute>
        }
      />
      <Route 
       path="/providers" 
       element={
        <ProtectedRoute>
          <Providers />
        </ProtectedRoute>
       
      }
     />
      <Route 
       path="/mybookings" 
       element={
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
       
      }
     />


      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/bookings" 
      element={
        <ProtectedRoute>
          <MyBookings />
          </ProtectedRoute>
      
      } 
      />
     <Route
  path="/provider-dashboard"
  element={
    <ProtectedProviderRoute>
      <ProviderLayout>
        <ProviderDashboard />
      </ProviderLayout>
    </ProtectedProviderRoute>
  }
/>

<Route
  path="/provider-profile"
  element={
    <ProtectedProviderRoute>
      <ProviderLayout>
        <ProviderProfile />
      </ProviderLayout>
    </ProtectedProviderRoute>
  }
/>
    </Routes>
    
    </>
  );
};

export default AppRoutes;