import { Prisma } from "@prisma/client";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id_education_department } = getQuery(event);

  var where: Prisma.MinorWhereInput = {};

  if (id_education_department)
    where.major = {
      id_education_department: id_education_department as string,
    };

  const data = await prisma.minor.findMany({
    where,
  });

  return data;
});
