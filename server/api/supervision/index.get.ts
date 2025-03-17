import { object, string } from "yup";
import prisma from "~/lib/prisma";
import authenticated from "~/server/middleware/api-authenticated";
import onlyStudent from "~/server/middleware/only-student";

export default defineEventHandler(async (event) => {
  await authenticated(event);

  // Only user role: student can create new supervision request
  await onlyStudent(event);

  const { secure } = await getUserSession(event);
  const student = await prisma.student.findFirstOrThrow({
    where: { id_user: secure.user.id },
  });

  const supervision = await prisma.supervision.findFirst({
    include: {
      supervisor: {
        include: { lecturer: { select: { id: true, full_name: true } } },
      },
      minor: true,
    },
    where: { id_student: student.id },
  });

  if (supervision) return supervision;

  throw createError({
    statusCode: 400,
    message: "Bad Request",
  });
});
