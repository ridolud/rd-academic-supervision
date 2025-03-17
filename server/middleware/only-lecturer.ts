import { UserRoleEnums } from "~/types/user";

export default defineEventHandler(async (event) => {
  if (event.path.startsWith("api")) {
    const { user } = await getUserSession(event);
    if (user.role != UserRoleEnums.LECTURER)
      throw createError({ status: 403, message: "forbidden" });
  }
});
