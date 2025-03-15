<script lang="ts" setup>
const isOpen = ref(false);

const formState = reactive({
  id_minor: "",
});

function openModal() {
  isOpen.value = true;
}
</script>
<template>
  <slot name="trigger" v-bind="{ openModal }"></slot>
  <UModal
    title="Form Request Bimbingan"
    v-model:open="isOpen"
    :dismissible="false"
  >
    <template #body> </template>
  </UModal>
</template>
