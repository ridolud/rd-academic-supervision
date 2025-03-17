<script lang="ts" setup>
const { data: lecturer } = await useFetch("/api/lecturer/own", { lazy: true });
</script>

<template>
  <UCard v-if="lecturer">
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-medium">{{ lecturer?.full_name }}</h3>
        <p class="text-gray-400 text-sm">
          {{ lecturer.lecture_number }} | {{ lecturer?.email }}
        </p>
      </div>
      <div class="grid lg:grid-cols-2 gap-4">
        <UFormField label="Program Studi">
          <p class="text-lg">{{ lecturer.education_department.name }}</p>
          <UBadge color="neutral" variant="outline">{{
            lecturer.education_department.code
          }}</UBadge>
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
        <UFormField label="Quota Bimbingan">
          <p class="text-lg">{{ lecturer.do_supervision_quota }}</p>
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
        <UFormField label="Bidang Peminatan">
          <div class="flex gap-2">
            <UBadge
              v-for="minor_lecturer in lecturer.minor_lecturers"
              color="neutral"
              variant="outline"
              >{{ minor_lecturer.minor.code }} -
              {{ minor_lecturer.minor.name }}</UBadge
            >
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
</template>
