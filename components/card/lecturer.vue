<template>
  <UCard>
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-medium">Jhon Doe</h3>
        <p class="text-gray-400 text-sm">[number] | email@domain.com</p>
      </div>
      <div class="grid lg:grid-cols-2 gap-4">
        <UFormField label="Program Studi">
          <p class="text-lg">Lorem ipsum dolor sit amet.</p>
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
          <p class="text-lg">2</p>
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
            <UBadge color="neutral" variant="outline">Peminatan 01</UBadge>
            <UBadge color="neutral" variant="outline">Peminatan 01</UBadge>
            <UBadge color="neutral" variant="outline">Peminatan 01</UBadge>
            <UBadge color="neutral" variant="outline">Peminatan 01</UBadge>
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
