import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        index: true,
        element: <Home />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  },
]);

export default appRoutes;
