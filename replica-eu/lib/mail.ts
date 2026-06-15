import { Resend } from "resend";

export async function sendOrderEmail({
  to,
  subject,
  html
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.info("[mail skipped]", { to, subject });
    return null;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  return resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Replica EU <orders@replica-eu.example>",
    to,
    subject,
    html
  });
}
