import { useVerifyEmailMutation } from "../redux/rtkQuery/authApi";
import { toast } from "sonner";

import EmailVerificationForm from "../components/EmailVerification_page/EmailVerificationForm";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const handleVerifyEmail = async (verificationOTP) => {
    try {
      // first signUp the user
      await verifyEmail(verificationOTP).unwrap();
      // and send the user to homePage because he is loggedIn(as the time of signUp) & now he is also verified
      navigate("/", { replace: true });
      // also send the success message to the user
      toast.success("Email verified successfully.");
    } catch (err) {
      console.error("Error in Email Verification : ", err);
      toast.error(err);
    }
  };
  
  return (
    <EmailVerificationForm
      handleVerifyEmail={handleVerifyEmail}
      isLoading={isLoading}
    />
  );
};

export default EmailVerification;
