import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  if (!user || user.role !== role) {
    Navigate("/");
  }

  return children;
}
