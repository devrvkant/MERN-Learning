import { Resend } from "resend";

// sender later this resendtoken from .env file later
export const resend = new Resend("re_KnyFKMPZ_3i1bf4N3SzUWH9RMzwmj8yTU");

// send these details from .env file later
const senderEmail = "onboarding@resend.dev"; // change after domain registration in production
const senderName = "Riki"; // App name

export const sender = `${senderName} <${senderEmail}>`;

async function sampleEmail () {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Hello World",
    html: "<strong>It works!</strong>",
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}
