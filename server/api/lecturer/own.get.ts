import prisma from "~/lib/prisma";
import authenticated from "~/server/middleware/api-authenticated";
import onlyLecturer from "~/server/middleware/only-lecturer";

export default defineEventHandler(async (event) => {
  await authenticated(event);
  await onlyLecturer(event);

  const { secure } = await getUserSession(event);

  const lecturer = await prisma.lecturer.findFirstOrThrow({
    include: {
      minor_lecturers: { include: { minor: true } },
      education_department: true,
    },
    where: { id_user: secure.user.id },
  });
  if (lecturer) return lecturer;

  throw createError({
    statusCode: 400,
    message: "Bad Request",
  });
});
