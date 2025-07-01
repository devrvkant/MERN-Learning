import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // If user is authenticated(loggedIn) then redirect to home/dashboard page
  if (isAuthenticated && user.isVerified) return <Navigate to={"/"} replace />;

  // otherWise redirect to the page(signUp/login)
  return children;
};

export default PublicRoute;
