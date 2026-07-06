import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
 
const ProtectedProviderRoute = ({ children }) => {
  const { token, role } = useAuth();
 
  // not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }
 
  // logged in but not provider
  if (role !== "provider") {
    return <Navigate to="/dashboard" replace />;
  }
 
  return children;
};
 
export default ProtectedProviderRoute;