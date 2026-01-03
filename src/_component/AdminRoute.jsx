// Hide Route from non-admin users

import { Navigate } from "react-router-dom";
import { useAuth } from "../_context/AuthContext.jsx";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  // Optional: handle loading state
  if (loading) {
    return <p>Checking permissions...</p>;
  }

  // Not logged in or not admin → redirect
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
}
