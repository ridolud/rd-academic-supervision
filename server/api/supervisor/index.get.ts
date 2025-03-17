import prisma from "~/lib/prisma";
import authenticated from "~/server/middleware/api-authenticated";
import { UserRoleEnums } from "~/types/user";

export default defineEventHandler(async (event) => {
  await authenticated(event);

  const { secure } = await getUserSession(event);
  if (secure.user.role == UserRoleEnums.STUDENT) {
    const supervisor = await prisma.supervisor.findMany({
      include: {
        lecturer: {
          select: { id: true, full_name: true },
        },
      },
      where: { supervision: { student: { id_user: secure.user.id } } },
    });

    return supervisor;
  }

  if (secure.user.role == UserRoleEnums.LECTURER) {
    const supervisor = await prisma.supervisor.findMany({
      include: {
        lecturer: true,
        supervision: {
          include: {
            minor: true,
            student: {
              select: {
                student_number: true,
                id: true,
                full_name: true,
                email: true,
              },
            },
          },
        },
      },
      where: { lecturer: { id_user: secure.user.id } },
      orderBy: [
        {
          status: "asc",
        },
        {
          request_date: "desc",
        },
      ],
    });

    return supervisor;
  }

  throw createError({
    statusCode: 400,
    message: "Bad Request",
  });
});
