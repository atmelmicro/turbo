"use server";

import { z } from "zod";
import { resend } from "@/backend/email";

export async function sendEmail(_prev: object, fd: FormData): Promise<object> {
  const data = z
    .object({
      name: z.string().min(2, "Není jméno"),
      email: z.string().email(),
      body: z.string().min(2, "Musí být zpráva"),
    })
    .safeParse(Object.fromEntries(fd));

  if (!data.success)
    return {
      error: data.error.errors
        .reduce((acc, x) => `${acc + x.message} | `, "")
        .slice(0, -2),
    };
  await resend.emails.send({
    from: "support@noreply.mat-development.com",
    reply_to: data.data.email,
    to: "david@mat-development.com",
    subject: "Support ticket",
    text: `From : ${data.data.name} - ${data.data.body}`,
  });

  return { message: "Sent!" };
}
