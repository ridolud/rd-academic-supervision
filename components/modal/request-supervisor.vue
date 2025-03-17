<script lang="ts" setup>
import { boolean, object, string } from "yup";

const props = defineProps<{
  id_supervisor: string | undefined;
  disabled_ids: string[];
}>();

const emits = defineEmits(["success"]);

const isOpen = ref(false);
function openModal() {
  isOpen.value = true;
}

const schema = object({
  id_lecturer: string().required().uuid(),
});

const state = reactive({
  id_lecturer: "",
});

async function onSubmit() {
  try {
    const path = props.id_supervisor
      ? `/api/supervisor/${props.id_supervisor}/change-lecturer`
      : "/api/supervisor";
    const supervisor = await $fetch(path, {
      method: "post",
      body: state,
    });
    emits("success", supervisor);
  } catch (err: any) {
    useToast().add({ color: "error", title: err.data.message });
  }
}
</script>
<template>
  <UModal title="Request Pembimbing" v-model:open="isOpen" :dismissible="false">
    <slot name="trigger" v-bind="{ openModal }"></slot>
    <template #body>
      <UForm :state="state" :schema="schema" @submit="onSubmit">
        <UFormField label="Pembimbing">
          <SelectLecturer
            :disabled_ids="disabled_ids"
            v-model="state.id_lecturer"
          />
        </UFormField>
        <div class="flex mt-8 justify-end gap-2 border-t border-gray-200 pt-4">
          <UButton
            type="submit"
            size="lg"
            trailing-icon="i-heroicons-paper-airplane"
            >Request</UButton
          >
        </div>
      </UForm>
    </template>
  </UModal>
</template>
