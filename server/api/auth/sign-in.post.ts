import { Lecturer, Student } from "@prisma/client";
import { compare, hash } from "bcrypt";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password)
    throw createError({
      statusCode: 400,
      message: "Invalid Input",
    });

  const user = await prisma.user.findFirst({ where: { email } });

  if (!user || !(await compare(password, user.password)))
    throw createError({
      statusCode: 401,
      message: "Invalid Credential",
    });

  if (user.role == "student") {
    const dataProfile = await prisma.student.findFirst({
      include: { education_department: true },
      where: { id_user: user.id },
    });

    await setUserSession(event, {
      user: {
        email: user.email,
        role: user.role,
        name: dataProfile?.full_name,
        education_department: dataProfile?.education_department,
      },
    });

    return {};
  }

  if (user.role == "lecturer") {
    const dataProfile = await prisma.lecturer.findFirst({
      include: { education_department: true },
      where: { id_user: user.id },
    });

    await setUserSession(event, {
      user: {
        email: user.email,
        role: user.role,
        name: dataProfile?.full_name,
        education_department: dataProfile?.education_department,
      },
    });

    return {};
  }

  throw createError({
    statusCode: 400,
    message: "Bad Request",
  });
});
