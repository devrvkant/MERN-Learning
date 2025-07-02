import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import EmailVerification from "../pages/EmailVerification";
import ForgotPassword from "../pages/ForgotPassword";
import PublicRoute from "../components/Auth/PublicRoute";
import ProtectedRoute from "../components/Auth/ProtectedRoute";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Protected Routes
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      // Public Routes
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        ),
      },
      // Not a PublicRoute :- might be needed by both authenticated and unauthenticated users
      {
        path: "verify-email",
        element: <EmailVerification />,
      },
    ],
  },
]);

export default appRoutes;
