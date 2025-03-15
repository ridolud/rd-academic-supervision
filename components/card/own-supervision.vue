<script lang="ts" setup></script>

<template>
  <UCard>
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
          <p class="text-xl font-medium text-warning-600">
            Menunggu Persetujuan
          </p>
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
          <p class="text-lg">Minor 01</p>
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
        <UFormField label="Pembimbing Pertama">
          <p class="text-lg">Lecturer 01</p>
          <p><UBadge color="warning">Menunggu Persetujuan</UBadge></p>
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
        <UFormField label="Pembimbing Kedua">
          <p class="text-lg">Lecturer 02</p>
          <p><UBadge color="success">Disetujui</UBadge></p>
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
