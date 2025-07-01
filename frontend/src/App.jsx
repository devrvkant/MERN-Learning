import { Outlet } from "react-router-dom";

import { useCheckAuthQuery } from "./redux/rtkQuery/authApi";
import FullPageLoader from "./components/Auth/FullPageLoader";
import { useMinDelay } from "./hooks/useMinDelay";

const App = () => {
  // check user's authStatus on app level
  const { isLoading: isCheckingAuth } = useCheckAuthQuery();
  const showLoader = useMinDelay(isCheckingAuth, 1000);

  return showLoader ? <FullPageLoader /> : <Outlet />;
};

export default App;
