<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import type { Supervisor } from "@prisma/client";

const UBadge = resolveComponent("UBadge");

const {
  data: supervisor,
  status,
  refresh,
} = await useFetch("/api/supervisor", {
  method: "get",
  lazy: true,
});

const column: TableColumn<any>[] = [
  {
    id: "mahasiswa",
    header: "Mahasiswa",
  },
  {
    id: "peminatan",
    header: "Peminantan",
  },
  {
    id: "date",
    header: "Tanggal Permohonan",
  },
  { id: "status", header: "Status" },
  {
    id: "actions",
    header: "",
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
      <UTable
        :loading="status == 'pending'"
        :data="supervisor || []"
        :columns="column"
        class="flex-1"
      >
        <template #mahasiswa-cell="{ row }">
          <div class="flex gap-1">
            <UBadge size="sm" color="neutral" variant="outline">{{
              row.original.supervision.student.student_number
            }}</UBadge>
            <p class="">
              {{ row.original.supervision.student.full_name }}
            </p>
          </div>
        </template>
        <template #peminatan-cell="{ row }">
          {{ row.original.supervision.minor.code }} -
          {{ row.original.supervision.minor.name }}
        </template>
        <template #status-cell="{ row }">
          <BadgeStatus :status="row.original.status" />
        </template>
        <template #date-cell="{ row }">
          {{ new Date(row.original.request_date).toLocaleDateString("id-ID") }}
        </template>
        <template #actions-cell="{ row }">
          <ModalApprovalSupervisor
            v-if="row.original.status == SupervisorStatusEnum.PENDING"
            :id_supervisor="row.original.id"
            @success="refresh"
          ></ModalApprovalSupervisor>
        </template>
      </UTable>
    </div>
  </UCard>
</template>
