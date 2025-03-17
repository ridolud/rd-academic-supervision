<script lang="ts" setup>
const props = defineProps<{ id_supervisor: string }>();
const emits = defineEmits(["success"]);

const isOpen = ref(false);
const status = ref();
const loading = ref(false);

async function onSubmit() {
  isOpen.value = false;
  loading.value = true;
  try {
    await $fetch(`/api/supervisor/${props.id_supervisor}/change-status`, {
      method: "post",
      body: { status: status.value },
    }).finally(() => (loading.value = false));
    emits("success");
  } catch (err: any) {
    useToast().add({ color: "error", title: err.data.message });
  }
}
</script>

<template>
  <div class="flex gap-2">
    <UButton
      color="error"
      variant="outline"
      :loading="loading"
      @click="
        () => {
          isOpen = true;
          status = SupervisorStatusEnum.REJECTED;
        }
      "
      >Tolak</UButton
    >
    <UButton
      :loading="loading"
      @click="
        () => {
          isOpen = true;
          status = SupervisorStatusEnum.APPROVED;
        }
      "
      >Setujui</UButton
    >
  </div>
  <UModal v-model:open="isOpen" title="Persetujuan Bimbingan">
    <template #body>
      <p class="text-center">
        Anda akan
        <b>{{
          status != SupervisorStatusEnum.REJECTED ? "mensetujui" : "menolak"
        }}</b>
        permohonan bimbingan.
      </p>
      <p
        class="text-sm text-center text-gray-400"
        v-if="status != SupervisorStatusEnum.REJECTED"
      >
        Jika Anda telah mencapai maximum quota bimbingan, maka sisa permohonan
        bimbingan akan otomatis ditolak.
      </p>
      <div class="flex justify-end mt-8 gap-2 border-t border-gray-200 pt-4">
        <UButton
          @click="onSubmit"
          :loading="loading"
          size="lg"
          trailing-icon="i-heroicons-paper-airplane"
          >Submit</UButton
        >
      </div>
    </template>
  </UModal>
</template>
