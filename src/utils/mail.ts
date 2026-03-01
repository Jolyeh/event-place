import { transporter } from "../config/mailer";
import { SentMessageInfo } from "nodemailer";

interface SendMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendMail = async ({
  to,
  subject,
  text,
  html,
}: SendMailOptions): Promise<boolean> => {
  try {
    const info: SentMessageInfo = await transporter.sendMail({
      from: `"MonApp" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return true;

  } catch (error: unknown) {

    console.error("Erreur envoi mail:", error);

    return false;

  }
};