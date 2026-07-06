import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
 
const ProtectedRoute = ({ children }) => {
  const { token, role } = useAuth();
 
  // not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }
 
  // logged in but not customer
  if (role !== "customer") {
    return <Navigate to="/provider-dashboard" replace />;
  }
 
  return children;
};
 
export default ProtectedRoute;