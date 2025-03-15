import { Prisma } from "@prisma/client";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id_minor, id_education_department } = getQuery(event);

  var where: Prisma.LecturerWhereInput = {};

  if (id_minor)
    where.minor_lecturers = { some: { id_minor: id_minor as string } };
  if (id_education_department)
    where.id_education_department = id_education_department as string;

  const data = await prisma.lecturer.findMany({
    where,
  });

  return data;
});
