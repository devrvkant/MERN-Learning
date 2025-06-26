import { resend, sender } from "./resend.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationOTP) => {
  const recipient = [email];

  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationOTP
      ),
    });

    if (error) throw new Error(error);

    console.log("Email send successfully : ", data);
  } catch (err) {
    console.error("Error in sending verification email : ", err);
    throw new Error(err);
  }
};
