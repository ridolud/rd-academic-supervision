import { Prisma, PrismaClient, type Minor } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function seeding() {
  // Department
  const rawDepartment = {
    name: "example department 01",
    code: "ED01",
    major: "example major 01",
    majorCode: "major01",
    minor: "example minor 01",
    minorCode: "minor01",
    minor2: "example minor 02",
    minorCode2: "minor02",
  };
  const rawDepartment2 = {
    name: "example department 02",
    code: "ED02",
    major: "example major 02",
    majorCode: "major02",
    minor: "example minor 03",
    minorCode: "minor03",
  };
  const educationDepartment = await prisma.educationDepartment.upsert({
    include: { major: true },
    where: { code: rawDepartment.code },
    create: {
      name: rawDepartment.name,
      code: rawDepartment.code,
      major: {
        connectOrCreate: {
          where: { code: rawDepartment.majorCode },
          create: {
            code: rawDepartment.majorCode,
            name: rawDepartment.major,
          },
        },
      },
    },
    update: {},
  });
  const educationDepartment2 = await prisma.educationDepartment.upsert({
    include: { major: true },
    where: { code: rawDepartment2.code },
    create: {
      name: rawDepartment2.name,
      code: rawDepartment2.code,
      major: {
        connectOrCreate: {
          where: { code: rawDepartment2.majorCode },
          create: {
            code: rawDepartment2.majorCode,
            name: rawDepartment2.major,
          },
        },
      },
    },
    update: {},
  });

  var minors: Minor[] = [];

  if (educationDepartment && educationDepartment.major) {
    minors = await prisma.$transaction([
      prisma.minor.upsert({
        where: { code: rawDepartment.minorCode },
        create: {
          id_major: educationDepartment.major.id,
          name: rawDepartment.minor,
          code: rawDepartment.minorCode,
        },
        update: {
          id_major: educationDepartment.major.id,
        },
      }),
      prisma.minor.upsert({
        where: { code: rawDepartment.minorCode2 },
        create: {
          id_major: educationDepartment.major.id,
          name: rawDepartment.minor2,
          code: rawDepartment.minorCode2,
        },
        update: {
          id_major: educationDepartment.major.id,
        },
      }),
    ]);
  }
  var minors2: Minor[] = [];
  if (educationDepartment2 && educationDepartment2.major) {
    minors2 = await prisma.$transaction([
      prisma.minor.upsert({
        where: { code: rawDepartment2.minorCode },
        create: {
          id_major: educationDepartment2.major.id,
          name: rawDepartment2.minor,
          code: rawDepartment2.minorCode,
        },
        update: {
          id_major: educationDepartment2.major.id,
        },
      }),
    ]);
  }

  console.log("educationDepartment", educationDepartment);
  console.log("minors", minors);

  console.log("educationDepartment2", educationDepartment2);
  console.log("minors2", minors2);

  const password = await hash("password", 10);

  // Students
  const rawStudents: Prisma.StudentCreateInput[] = [
    {
      full_name: "example student 01",
      email: "student01@email.com",
      education_department: { connect: { id: educationDepartment.id } },
      student_number: "student-01",
    },
    {
      full_name: "example student 02",
      email: "student02@email.com",
      education_department: { connect: { id: educationDepartment.id } },
      student_number: "student-02",
    },
  ];
  const userStudents = await prisma.$transaction([
    ...rawStudents.map((rawStudent) =>
      prisma.user.upsert({
        where: { email: rawStudent.email },
        update: {},
        create: {
          email: rawStudent.email,
          password,
          role: "student",
        },
      })
    ),
  ]);
  const students = await prisma.$transaction([
    ...rawStudents.map((rawStudent) =>
      prisma.student.upsert({
        where: { email: rawStudent.email },
        update: {
          id_user: userStudents.find((user) => user.email == rawStudent.email)
            ?.id,
        },
        create: {
          id_user: userStudents.find((user) => user.email == rawStudent.email)
            ?.id,
          email: rawStudent.email,
          student_number: rawStudent.student_number,
          full_name: rawStudent.full_name,
          education_department: rawStudent.education_department,
        },
      })
    ),
  ]);
  console.log("userStudents", userStudents);
  console.log("students", students);

  // Lecturer
  var rawLecturers: Prisma.LecturerCreateInput[] = [
    {
      full_name: "example lecturer 01",
      email: "lecturer01@email.com",
      education_department: { connect: { id: educationDepartment.id } },
      lecture_number: "lecturer-01",
    },
    {
      full_name: "example lecturer 02",
      email: "lecturer02@email.com",
      education_department: { connect: { id: educationDepartment.id } },
      lecture_number: "lecturer-02",
    },
  ];
  const userLecturers = await prisma.$transaction([
    ...rawLecturers.map((rawLecturer) =>
      prisma.user.upsert({
        where: { email: rawLecturer.email },
        update: {},
        create: {
          email: rawLecturer.email,
          password,
          role: "lecturer",
        },
      })
    ),
  ]);
  const lecturers = await prisma.$transaction([
    ...rawLecturers.map((rawLecturer) =>
      prisma.lecturer.upsert({
        where: { email: rawLecturer.email },
        update: {
          id_user: userLecturers.find((user) => user.email == rawLecturer.email)
            ?.id,
          do_supervision_quota: 1,
        },
        create: {
          do_supervision_quota: 1,
          id_user: userLecturers.find((user) => user.email == rawLecturer.email)
            ?.id,
          email: rawLecturer.email,
          lecture_number: rawLecturer.lecture_number,
          full_name: rawLecturer.full_name,
          education_department: rawLecturer.education_department,
        },
      })
    ),
  ]);
  console.log("userLecturers", userLecturers);
  console.log("lecturers", lecturers);

  //Minor Lecturer
  if (lecturers[0]) {
    if (minors[0]) {
      const minorLecture01 = await prisma.minorLecturer.upsert({
        where: {
          id_lecturer_id_minor: {
            id_minor: minors[0].id,
            id_lecturer: lecturers[0].id,
          },
        },
        update: {
          id_minor: minors[0].id,
          id_lecturer: lecturers[0].id,
        },
        create: {
          id_minor: minors[0].id,
          id_lecturer: lecturers[0].id,
        },
      });
    }
    if (minors[1]) {
      const minorLecture01 = await prisma.minorLecturer.upsert({
        where: {
          id_lecturer_id_minor: {
            id_minor: minors[1].id,
            id_lecturer: lecturers[0].id,
          },
        },
        update: {
          id_minor: minors[1].id,
          id_lecturer: lecturers[0].id,
        },
        create: {
          id_minor: minors[1].id,
          id_lecturer: lecturers[0].id,
        },
      });
    }
  }
  if (lecturers[1]) {
    if (minors[0]) {
      const minorLecture02 = await prisma.minorLecturer.upsert({
        where: {
          id_lecturer_id_minor: {
            id_minor: minors[0].id,
            id_lecturer: lecturers[1].id,
          },
        },
        update: {
          id_minor: minors[0].id,
          id_lecturer: lecturers[1].id,
        },
        create: {
          id_minor: minors[0].id,
          id_lecturer: lecturers[1].id,
        },
      });
    }
  }
}

seeding()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
