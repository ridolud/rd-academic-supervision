import type { Student, Supervisor } from "@prisma/client";
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

export function sendEmailNewRequestSupervisor(
  to: string,
  student_full_name: string
) {
  mail.sendMail({
    to,
    subject: "Prmohonan bimbingan baru",
    html: `<p>Ada permohonan bimbingan baru dari ${student_full_name}</p>`,
  });
}

export function sendEmailRequestSupervisorStatusUpdate(
  to: string,
  lecturer_full_name: string,
  status: string
) {
  mail.sendMail({
    to,
    subject: "Prmohonan bimbingan telah diperbaharui",
    html: `<p>Ada permohonan bimbingan untuk pembimbing: ${lecturer_full_name}, telah diperbaharui degan status: ${status}</p>`,
  });
}
