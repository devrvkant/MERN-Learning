import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { useResetPasswordMutation } from "../redux/rtkQuery/authApi";
import ResetPasswordForm from "../components/ResetPassword_Page/ResetPasswordForm";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = async (password) => {
    try {
      await resetPassword({ token, password }).unwrap();

      // show success message
      toast.success("Password reset successful, redirecting to login page...");

      // Navigate to login page after successful reset
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (err) {
      console.error("Error in passwordReset : ", err);
      toast.error(err);
    }
  };

  return (
    <ResetPasswordForm
      handleResetPassword={handleResetPassword}
      isLoading={isLoading}
    />
  );
};

export default ResetPassword;
