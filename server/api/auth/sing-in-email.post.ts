import { generateEmailToken } from "~/lib/jwt";
import { sendEmailLink } from "~/lib/mail";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);

  const { session } = useRuntimeConfig();
  const user = await prisma.user.findFirst({ where: { email } });

  if (user) {
    const token = generateEmailToken(
      { email: user.email, id_user: user.id },
      session.password
    );
    sendEmailLink(email, token);
  }

  return "ok";
});
