<script lang="ts" setup>
const { loggedIn } = useUserSession();
watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo("/");
  }
});
</script>

<template>
  <div class="relative">
    <UApp>
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>

<style lang="css">
body {
  background-color: var(--ui-bg-muted);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
