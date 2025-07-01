import { Outlet } from "react-router-dom";

import { useCheckAuthQuery } from "./redux/rtkQuery/authApi";

const App = () => {
  // check user's authStatus on app level
  const { isLoading, data: user, isSuccess, error } = useCheckAuthQuery();

  return <Outlet />;
};

export default App;
