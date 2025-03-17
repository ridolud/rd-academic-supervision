import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const domain = process.env.DOMAIN ?? "http://localhost";

export const mail = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE == "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  from: process.env.MAIL_FROM,
} as SMTPTransport.Options);

export function sendEmailLink(to: string, emailToken: string) {
  mail.sendMail({
    to,
    subject: "Sign in with email link",
    html: `<p>sign in with this link <a href="${domain}/api/auth/verify-email-link?token=${emailToken}">${domain}/api/auth/verify-email-link?token=${emailToken}</a></p>`,
  });
}
