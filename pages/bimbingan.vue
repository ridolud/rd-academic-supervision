<script lang="ts" setup>
const { user } = useUserSession();
definePageMeta({
  middleware: ["authenticated"],
});
</script>

<template>
  <section class="space-y-4 mb-6 pb-4 border-b border-gray-200">
    <h2 class="text-4xl font-semibold text-primary-800">Bimbingan</h2>
    <p>Permintaan bimbingan hanya berlaku hingga [date].</p>
  </section>
  <section v-if="user?.role == 'student'" class="space-y-4 mb-6">
    <CardRequestSupervision />
    <!-- <CardOwnSupervision /> -->
  </section>
  <section v-if="user?.role == 'lecturer'" class="space-y-4 mb-6">
    <CardLecturer />
    <CardSupervision />
  </section>
</template>
