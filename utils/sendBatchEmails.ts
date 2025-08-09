"use server";

import { NewMessage } from "./types";
import NewMessageEmail from "@/components/emails/NewMessageEmail";
import ConfirmationEmail from "@/components/emails/ConfirmationEmail";
import { Resend } from "resend";

export const sendBatchEmails = async (data: NewMessage) => {
  const resend = new Resend(process.env.RESEND_API_KEY as string);

  const { name, email } = data;

  try {
    const response = await resend.batch.send([
      {
        from: `The Soulcial Well <${process.env.SENDER_EMAIL as string}>`,
        to: email,
        subject: "Thank you for your inquiry!",
        react: ConfirmationEmail({ name }),
      },
      {
        from: `The Soulcial Well <${process.env.SENDER_EMAIL as string}>`,
        to: process.env.BUSINESS_EMAIL as string,
        subject: "New message inquiry from your site!",
        react: NewMessageEmail({ newMessage: data }),
      },
    ]);

    if (response.data) {
      console.log(response.data);
      return {
        message: "Message sent successfully",
        description: "Be on the lookout for a confirmation email!",
      };
    }
  } catch {
    throw new Error(
      "Sorry! An error occurred creating your appointment. Please try again later."
    );
  }
};
