export default defineEventHandler(async (event) => {
  if (event.path.startsWith("api")) {
    const { user } = await getUserSession(event);
    if (!user)
      throw createError({ status: 401, message: "Uasdasdnauthorized" });
  }
});
