<script lang="ts" setup>
const { user } = useUserSession();

const { data, status } = await useFetch("/api/minor", {
  query: {
    id_education_department: user.value?.education_department.id,
  },
  transform: (data: any[]) => {
    return (
      data?.map((minor) => ({
        label: minor.name,
        value: minor.id,
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
    :items="data || []"
    v-model="model"
    value-key="value"
    placeholder="Pilih peminatan"
  ></USelect>
</template>
