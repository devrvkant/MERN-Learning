import { useRef } from "react";
import { toast } from "sonner";
import ForgotPasswordForm from "../components/ForgotPassword_Page/ForgotPasswordForm";
import { useForgotPasswordMutation } from "../redux/rtkQuery/authApi";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const formRef = useRef(null);

  const handleForgotPassword = async (email) => {
    try {
      const successMsg = await forgotPassword(email).unwrap();
      // Clear the email input field after successful submission
      if (formRef.current) {
        formRef.current.reset();
      }
      // Handle success (e.g., show a success message)
      toast.success(successMsg);
    } catch (err) {
      console.error("Error in Forgot Password: ", err);
      toast.error(err);
    }
  };

  return (
    <ForgotPasswordForm
      ref={formRef}
      handleForgotPassword={handleForgotPassword}
      isLoading={isLoading}
    />
  );
};

export default ForgotPassword;
