import { Prisma } from "@prisma/client";
import prisma from "~/lib/prisma";
import authenticated from "~/server/middleware/api-authenticated";

export default defineEventHandler(async (event) => {
  await authenticated(event);

  const { user } = await getUserSession(event);

  const minors = await prisma.minor.findMany({
    where: {
      major: {
        id_education_department: user.education_department.id,
      },
    },
  });

  if (minors) return minors;

  throw createError({
    statusCode: 400,
    message: "Bad Request",
  });
});
