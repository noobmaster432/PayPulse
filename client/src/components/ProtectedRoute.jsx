/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Element /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
