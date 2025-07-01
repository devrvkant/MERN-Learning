import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import EmailVerification from "../pages/EmailVerification";
import PublicRoute from "../components/Auth/PublicRoute";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Protected Routes
      {
        index: true,
        element: <Home />,
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
        path: "verify-email",
        element: <EmailVerification />,
      },
    ],
  },
]);

export default appRoutes;
