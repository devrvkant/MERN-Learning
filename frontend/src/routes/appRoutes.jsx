import { createBrowserRouter } from "react-router-dom";

import App from "../App";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

export default appRoutes;
