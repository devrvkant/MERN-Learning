import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./app.css"; // Tailwind CsS
import { store } from "./redux/store.js";
import { Toaster } from "./components/ui/sonner.jsx";
import appRoutes from "./routes/appRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRoutes} />
      <Toaster position="top-right" />
    </Provider>
  </StrictMode>
);
