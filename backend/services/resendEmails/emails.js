import { resend, sender } from "./resend.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationOTP) => {
  const recipient = [email];
  const personalizedVerificationEmail = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationOTP);
  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: personalizedVerificationEmail,
    });

    if (error) throw new Error(error);

    console.log("Verification email sent successfully : ", data);
  } catch (err) {
    console.error("Error in sending verification email : ", err);
    throw new Error(err);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [email];
  const personalizedWelcomeEmail = WELCOME_EMAIL_TEMPLATE
    .replace(/{{COMPANY_NAME}}/g,"riki.tech")
    .replace(/{{USER_NAME}}/g, name || "there")
    // provide the real app url here later
    .replace(/{{APP_URL}}/g, "jangir.me")
    .replace(/{{SUPPORT_EMAIL}}/g, "rikijangir99@gmail.com")
    .replace(/{{UNSUBSCRIBE_URL}}/g, "provide the url");

  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to: recipient,
      subject: "🎉 Welcome to riki.tech - You're all set!",
      html: personalizedWelcomeEmail,
    });

    if (error) throw new Error(error);

    console.log("Welcome email sent successfully : ", data);
  } catch (err) {
    console.error("Error in sending verification email : ", err);
    throw new Error(err);
  }
};
