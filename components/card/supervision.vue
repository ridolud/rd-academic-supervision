<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
const UBadge = resolveComponent("UBadge");
const data = ref([
  {
    id: "student-01",
    full_name: "Jhon Doe",
    status: "pending",
  },
  {
    id: "student-01",
    full_name: "Jhon Doe",
    status: "pending",
  },
]);

const column: TableColumn<any>[] = [
  {
    accessorKey: "full_name",
    header: "Mahasiswa",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      h(
        UBadge,
        { class: "capitalize", variant: "subtle", color: "warning" },
        () => row.getValue("status")
      ),
  },
];
</script>

<template>
  <UCard>
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-medium">List Permohonan Bimbingan</h3>
        <p class="text-gray-400 text-sm">
          Berikut adalah list pengajuan bimbingan dari para mahasiswa. Dimohon
          segera diproses degan cara disetujui atau di tolak
        </p>
      </div>
      <UTable :data="data" :columns="column" class="flex-1" />
    </div>
  </UCard>
</template>
