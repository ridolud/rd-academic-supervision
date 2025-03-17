import { number, object, string } from "yup";
import prisma from "~/lib/prisma";
import authenticated from "~/server/middleware/api-authenticated";
import onlyStudent from "~/server/middleware/only-student";

const bodySchema = object({
  id_minor: string().uuid().required(),
  supervisor_qty: number().max(2).min(1).required(),
});

export default defineEventHandler(async (event) => {
  await authenticated(event);

  // Only user role: student can create new supervision request
  await onlyStudent(event);

  const { secure } = await getUserSession(event);
  const student = await prisma.student.findFirstOrThrow({
    where: { id_user: secure.user.id },
  });

  const { id_minor, supervisor_qty } = await readValidatedBody(event, (body) =>
    bodySchema.validate(body)
  );

  // Only create once per students
  const supervision = await prisma.supervision.upsert({
    include: {
      supervisor: {
        include: { lecturer: { select: { id: true, full_name: true } } },
      },
    },
    where: { id_student: student.id },
    update: {},
    create: {
      supervisor_qty,
      id_student: student.id,
      id_minor,
    },
  });

  if (supervision) return supervision;

  throw createError({
    statusCode: 400,
    message: "Bad Request",
  });
});
