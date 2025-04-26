import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roleRequired }) {
  const userString = localStorage.getItem("user");
  let user = null;

  try {
    user = userString ? JSON.parse(userString) : null;
    console.log("ProtectedRoute user:", user); 
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    localStorage.removeItem("user");
  }

  if (!user || !user.id) {
    console.warn("No valid user, redirecting to login");
    return <Navigate to="/login" />;
  }

  if (roleRequired && user.role !== roleRequired) {
    console.warn(
      `Role ₹{user.role} does not match required ₹{roleRequired}, redirecting to home`
    );
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
