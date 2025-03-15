import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const lecturer = await prisma.lecturer.findFirst({
      select: {
        id: true,
        full_name: true,
        education_department: true,
        minor_lecturers: true,
      },
      where: { id },
    });

    if (!lecturer)
      throw createError({ status: 404, message: "lecturer not found!" });

    return lecturer;
  } catch {
    throw createError({ status: 400, message: "bad request!" });
  }
});
