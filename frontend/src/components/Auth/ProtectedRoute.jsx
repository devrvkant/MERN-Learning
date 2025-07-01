import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// protect routes that requires Authenticated(loggedIn) user
const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // if not authenticated redirect to loginPage
  if (!isAuthenticated) return <Navigate to={"/login"} replace />;

  // if not verified redirect to verifyEmail page
  if (!user.isVerified) return <Navigate to={"/verify-email"} replace />;

  return children;
};

export default ProtectedRoute;
