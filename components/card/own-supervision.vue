<script lang="ts" setup>
const { data: supervision, refresh } = await useFetch("/api/supervision");

const status = computed(() => {
  if (!supervision.value?.supervisor.length)
    return SupervisorStatusEnum.PENDING;
  if (
    supervision.value.supervisor.filter(
      (sp) => sp.status == SupervisorStatusEnum.APPROVED
    ).length >= supervision.value.supervisor_qty
  )
    return SupervisorStatusEnum.APPROVED;

  if (
    supervision.value.supervisor.filter(
      (sp) => sp.status == SupervisorStatusEnum.REJECTED
    ).length >= supervision.value.supervisor_qty
  )
    return SupervisorStatusEnum.REJECTED;

  return SupervisorStatusEnum.PENDING;
});

const disabledIdsOfLecturer = computed(() => {
  return (
    supervision.value?.supervisor
      .filter((s) => s.status != SupervisorStatusEnum.REJECTED)
      .map((s) => s.id_lecturer) ?? []
  );
});
</script>

<template>
  <UCard v-if="supervision">
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-medium">Request Bimbingan</h3>

        <p class="text-gray-400 text-sm">
          Kamu tidak dapat merubah requset bimbingan ini jika semua pembimbing
          menyetujui requset bimbingan ini.
        </p>
      </div>
      <div class="grid lg:grid-cols-2 gap-4">
        <UFormField label="Status">
          <BadgeStatus :status="status" />
        </UFormField>
        <div>
          <p class="text-gray-400 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
            commodi voluptate sint magni nostrum ratione? Maxime, quo quasi
            soluta, assumenda, vel vero ad reprehenderit laboriosam ex enim hic
            incidunt? Dolores!
          </p>
        </div>
      </div>
      <div class="grid lg:grid-cols-2 gap-4 border-t border-gray-200 pt-4">
        <UFormField label="Peminatan">
          <p class="text-lg capitalize">{{ supervision.minor.name }}</p>
        </UFormField>
        <div>
          <p class="text-gray-400 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
            commodi voluptate sint magni nostrum ratione? Maxime, quo quasi
            soluta, assumenda, vel vero ad reprehenderit laboriosam ex enim hic
            incidunt? Dolores!
          </p>
        </div>
      </div>

      <div
        v-for="n in supervision.supervisor_qty"
        class="grid lg:grid-cols-2 gap-4 border-t border-gray-200 pt-4"
      >
        <UFormField :label="`Pembimbing ${n}`">
          <div class="space-y-4">
            <div v-if="supervision.supervisor[n - 1]">
              <p class="text-lg">
                {{ supervision.supervisor[n - 1].lecturer.full_name }}
              </p>
              <p>
                <BadgeStatus :status="supervision.supervisor[n - 1].status" />
              </p>
            </div>
            <div
              v-if="
                !supervision.supervisor[n - 1] ||
                supervision.supervisor[n - 1].status ==
                  SupervisorStatusEnum.REJECTED
              "
            >
              <ModalRequestSupervisor
                :id_supervisor="supervision.supervisor[n - 1]?.id ?? undefined"
                :disabled_ids="disabledIdsOfLecturer"
                @success="refresh"
              >
                <template #trigger>
                  <UButton variant="outline" icon="i-heroicons-user-circle"
                    >Request Pembimbing</UButton
                  >
                </template>
              </ModalRequestSupervisor>
            </div>
          </div>
        </UFormField>
        <div>
          <p class="text-gray-400 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
            commodi voluptate sint magni nostrum ratione? Maxime, quo quasi
            soluta, assumenda, vel vero ad reprehenderit laboriosam ex enim hic
            incidunt? Dolores!
          </p>
        </div>
      </div>
    </div>
  </UCard>
  <CardRequestSupervision v-if="!supervision" @success="refresh" />
</template>
