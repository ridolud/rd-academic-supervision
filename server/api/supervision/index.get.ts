import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  // const { id_minor, id_education_department } = getQuery(event);

  // var where: any = {};
  // if (id_minor) where.minor_lecturers = { some: { id_minor } };
  // if (id_education_department)
  //   where.id_education_department = id_education_department;
  // try {
  //   const lecturers = await prisma.lecturer.findMany({
  //     select: { id: true, full_name: true },
  //     where,
  //   });
  //   return lecturers;
  // } catch {
  //   throw createError({ status: 400, message: "bad request!" });
  // }

  return "ok";
});
