import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/Login_Page/LoginForm";
import { useLogInMutation } from "../redux/rtkQuery/authApi";

const Login = () => {
  const navigate = useNavigate()
  const [logIn, { isLoading }] = useLogInMutation();

  const handleLogin = async (email, password) => {
    try {
      // first signUp the user
      await logIn({
        email,
        password,
      }).unwrap();
      // then navigate to verify-email page
      navigate("/", {replace: true});
    } catch (err) {
      console.error("Error in logIn : ", err)
      toast.error(err) 
    }
  };
  return <LoginForm handleLogin={handleLogin} isLoading={isLoading} />;
};

export default Login;
