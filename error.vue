<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

function onClearError() {
  clearError();
  navigateTo("/");
}
</script>
<template>
  <div class="h-screen w-full flex justify-center items-center">
    <div class="w-full max-w-96 text-center space-y-4">
      <h1 class="text-6xl text-gray-400">{{ error?.statusCode }}</h1>
      <p class="text-gray-400 truncate">{{ error?.message }}</p>

      <UButton @click="onClearError">Kembali kehalaman utama</UButton>
    </div>
  </div>
</template>
