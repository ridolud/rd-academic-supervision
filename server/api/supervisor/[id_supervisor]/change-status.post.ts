import { object, number, string, mixed } from "yup";
import prisma from "~/lib/prisma";
import authenticated from "~/server/middleware/api-authenticated";
import onlyLecturer from "~/server/middleware/only-lecturer";
import { SupervisorStatusEnum } from "~/types/supervisor";

const bodySchema = object({
  status: string()
    .oneOf(
      [SupervisorStatusEnum.APPROVED, SupervisorStatusEnum.REJECTED],
      "status can only be set to either approved or rejected"
    )
    .required(),
});

export default defineEventHandler(async (event) => {
  await authenticated(event);

  await onlyLecturer(event);

  const { secure } = await getUserSession(event);

  const id_supervisor = getRouterParam(event, "id_supervisor");

  const { status } = await readValidatedBody(event, (body) =>
    bodySchema.validate(body)
  );

  if (status == SupervisorStatusEnum.APPROVED) {
    const lecturer = await prisma.lecturer.findFirstOrThrow({
      where: { id_user: secure.user.id },
      include: {
        supervisor: { where: { status: SupervisorStatusEnum.APPROVED } },
      },
    });

    if (lecturer.do_supervision_quota <= lecturer.supervisor.length)
      throw createError({
        status: 403,
        message: "reach maximum occupation of supervisor request",
      });
  }

  const supervisor = await prisma.supervisor.update({
    where: {
      id: id_supervisor,
      lecturer: { id_user: secure.user.id },
      status: SupervisorStatusEnum.PENDING,
    },
    data: {
      status,
    },
  });

  if (supervisor) {
    if (status == SupervisorStatusEnum.APPROVED) {
      const rejectedSupervisors = await prisma.supervisor.updateMany({
        where: {
          lecturer: { id_user: secure.user.id },
          status: SupervisorStatusEnum.PENDING,
        },
        data: {
          status: SupervisorStatusEnum.REJECTED,
        },
      });
    }

    //TODO:notification stuff

    return supervisor;
  }

  throw createError({
    statusCode: 400,
    message: "Bad Request",
  });
});
