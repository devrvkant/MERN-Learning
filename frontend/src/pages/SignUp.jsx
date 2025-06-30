import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import SignUpForm from "../components/SignUp_Page/SignUpForm";
import { useSignUpMutation } from "../redux/rtkQuery/authApi";

const SignUp = () => {
  const navigate = useNavigate()
  const [signUp, { isLoading }] = useSignUpMutation();

  const handleSignUp = async (name, email, password) => {
    try {
      // first signUp the user
      await signUp({
        name,
        email,
        password,
      }).unwrap();
      // then navigate to verify-email page
      navigate("/verify-email");
      // also send the success message to the user
      toast.success("Account created successfully, verification code sent to your provided email to verify your account.");
    } catch (err) {
      console.error("Error in SignUp : ", err)
      toast.error(err) 
    }
  };

  return <SignUpForm handleSignUp={handleSignUp} isLoading={isLoading} />;
};

export default SignUp;
