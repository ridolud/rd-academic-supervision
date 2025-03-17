import { verifyToken } from "~/lib/jwt";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event);

  const { session } = useRuntimeConfig();

  if (token) {
    const payload = verifyToken(token as string, session.password);
    const user = await prisma.user.findFirst({
      where: { email: payload.email },
    });
    await clearUserSession(event);
    if (user && user.role == "student") {
      const dataProfile = await prisma.student.findFirst({
        include: { education_department: true },
        where: { id_user: user.id },
      });

      await setUserSession(event, {
        user: {
          email: user.email,
          role: user.role,
          name: dataProfile?.full_name,
          education_department: dataProfile?.education_department,
        },
        secure: {
          user: user,
        },
      });
      sendRedirect(event, "/");
    }

    if (user && user.role == "lecturer") {
      const dataProfile = await prisma.lecturer.findFirst({
        include: { education_department: true },
        where: { id_user: user.id },
      });

      await setUserSession(event, {
        user: {
          email: user.email,
          role: user.role,
          name: dataProfile?.full_name,
          education_department: dataProfile?.education_department,
        },
        secure: {
          user: user,
        },
      });

      sendRedirect(event, "/");
    }
  }

  throw createError({
    status: 400,
    message: "token is invalid",
  });
});
