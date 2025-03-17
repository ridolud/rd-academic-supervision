export default defineAppConfig({
  ui: {
    colors: {
      primary: "blue",
      neutral: "neutral",
      secondary: "green",
    },
    container: {
      base: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
    },
    button: {
      base: "cursor-pointer",
    },
    icons: {
      loading: "i-uil-spinner",
    },
    toaster: {
      position: "top-center",
    },
  },
});
