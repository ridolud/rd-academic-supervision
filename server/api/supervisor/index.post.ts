import { object, number, string } from "yup";
import { sendEmailNewRequestSupervisor } from "~/lib/mail";
import prisma from "~/lib/prisma";
import authenticated from "~/server/middleware/api-authenticated";
import onlyStudent from "~/server/middleware/only-student";

const bodySchema = object({
  id_lecturer: string().required().uuid(),
});

export default defineEventHandler(async (event) => {
  await authenticated(event);

  await onlyStudent(event);

  const { secure } = await getUserSession(event);

  const supervision = await prisma.supervision.findFirstOrThrow({
    include: { supervisor: true, student: true },
    where: { student: { id_user: secure.user.id } },
  });

  // Max request lecturer base on student's initial supervision request
  if (supervision.supervisor_qty <= supervision.supervisor.length)
    throw createError({
      status: 403,
      message: "Dosen pembimbing telah mencapai maximum quota",
    });

  const { id_lecturer } = await readValidatedBody(event, (body) =>
    bodySchema.validate(body)
  );

  // find lecturer base on id_education_department, id_minor, and availability
  const minorLecturer = await prisma.minorLecturer.findFirstOrThrow({
    include: {
      lecturer: {
        include: {
          supervisor: {
            where: { status: "approved" },
          },
        },
      },
    },
    where: {
      lecturer: {
        id_education_department: supervision.student.id_education_department,
        id: id_lecturer,
      },
      id_minor: supervision.id_minor,
    },
  });
  if (
    minorLecturer.lecturer.do_supervision_quota <=
    minorLecturer.lecturer.supervisor.length
  )
    throw createError({ status: 403, message: "lecturer is not available " });

  const supervisor = await prisma.supervisor.create({
    include: { supervision: { include: { student: true } } },
    data: {
      id_supervisions: supervision.id,
      id_lecturer: minorLecturer.id_lecturer,
      status: "pending",
    },
  });
  if (supervisor) {
    await sendEmailNewRequestSupervisor(
      minorLecturer.lecturer.email,
      supervisor.supervision.student.full_name
    );
    return supervisor;
  }

  throw createError({
    statusCode: 400,
    message: "Bad Request",
  });
});
