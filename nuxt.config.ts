// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@prisma/nuxt", "@nuxt/ui", "nuxt-auth-utils"],
  css: ["~/assets/css/main.css"],
  imports: {
    dirs: ["types"],
  },
  ui: {
    colorMode: false,
  },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    public: {
      isOpenRequestSupervision: process.env.OPEN_REQUEST_SUPERVISION == "true",
    },
  },
});
