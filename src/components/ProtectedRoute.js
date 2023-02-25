import { useAppContext } from "../context/AppProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { origin, destination } = useAppContext();
  if (!origin || !destination) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
