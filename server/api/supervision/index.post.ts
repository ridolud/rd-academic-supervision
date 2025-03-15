import { object, string } from "yup";
import authenticated from "~/server/middleware/authenticated";

const bodySchema = object({
  id_minor: string().uuid().required(),
  id_lecturer1: string().uuid().required(),
  id_lecturer2: string().uuid(),
});

export default defineEventHandler(async (event) => {
  await authenticated(event);

  const { id_minor, id_lecturer1, id_lecturer2 } = await readValidatedBody(
    event,
    (body) => bodySchema.validate(body)
  );

  return "ok";
});
