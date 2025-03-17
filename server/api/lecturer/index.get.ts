import prisma from "~/lib/prisma";
import authenticated from "~/server/middleware/api-authenticated";
import { SupervisorStatusEnum } from "~/types/supervisor";
import { UserRoleEnums } from "~/types/user";

export default defineEventHandler(async (event) => {
  await authenticated(event);

  const { secure } = await getUserSession(event);

  if (secure.user.role == UserRoleEnums.LECTURER) {
    const lecturer = await prisma.lecturer.findFirstOrThrow({
      where: { id_user: secure.user.id },
    });

    const lecturers = await prisma.lecturer.findMany({
      where: { id_education_department: lecturer.id_education_department },
    });

    return lecturers;
  }

  if (secure.user.role == UserRoleEnums.STUDENT) {
    const student = await prisma.student.findFirstOrThrow({
      include: { supervision: { include: { supervisor: true } } },
      where: { id_user: secure.user.id },
    });

    const lecturers = await prisma.lecturer.findMany({
      select: {
        id: true,
        full_name: true,
        education_department: true,
        do_supervision_quota: true,
        minor_lecturers: true,
        _count: {
          select: {
            supervisor: {
              where: { status: SupervisorStatusEnum.APPROVED },
            },
          },
        },
      },
      where: {
        id_education_department: student.id_education_department,
        minor_lecturers: {
          some: { id_minor: student.supervision?.id_minor },
        },
      },
    });

    return lecturers;
  }

  throw createError({
    statusCode: 400,
    message: "Bad Request",
  });
});
