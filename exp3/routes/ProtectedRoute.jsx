import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    return <h2>Access Denied</h2>;
  }
  return children;
}

export default ProtectedRoute;