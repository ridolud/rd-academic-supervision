<script lang="ts" setup>
const props = defineProps<{
  disabled_ids: string[];
}>();

const { data: lecturers, status } = await useFetch("/api/lecturer", {
  transform: (data: any[]) => {
    return (
      data?.map((lecturer) => ({
        label: lecturer.full_name,
        value: lecturer.id,
        disabled:
          lecturer.do_supervision_quota <= lecturer._count.supervisor ||
          props.disabled_ids.includes(lecturer.id),
      })) || []
    );
  },
  lazy: true,
});

const model = defineModel();
</script>

<template>
  <USelect
    :loading="status == 'pending'"
    class="w-full"
    size="lg"
    :items="lecturers || []"
    v-model="model"
    value-key="value"
    placeholder="Pilih pembimbing"
  ></USelect>
</template>
