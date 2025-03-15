<script lang="ts" setup>
definePageMeta({});
</script>

<template>
  <section class="mb-6">
    <UCard class="bg-gradient-to-r to-primary-500 from-indigo-500">
      <div class="space-y-4 text-white">
        <div class="space-y-2">
          <h1 class="text-6xl">Web Portal <br />Bimbingan Skripsi</h1>
          <h2 class="text-xl font-medium">Sekolah Tinggi Keperawatan</h2>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At quibusdam
          doloremque non, facilis sunt vero aut porro aspernatur nobis corrupti
          rerum impedit voluptatibus, nisi blanditiis voluptas ex. Quas,
          similique ducimus.
        </p>
        <UButton
          color="secondary"
          size="xl"
          trailing-icon="i-heroicons-arrow-right"
          >Request Bimbingan</UButton
        >
      </div>
    </UCard>
  </section>
  <section class="space-y-4 mb-6">
    <h3 class="text-lg font-bold">Ketentuan Umum</h3>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium ex
      voluptatum aspernatur, blanditiis sequi error provident tempore obcaecati
      optio aut sint hic consectetur. Repudiandae id explicabo est, enim magnam
      laborum.
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium ex
      voluptatum aspernatur
    </p>
    <ul class="list-disc list-inside">
      <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
      <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
      <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
      <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
      <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
    </ul>
    <UAlert
      color="secondary"
      variant="subtle"
      title="Important!"
      description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium ex
      voluptatum aspernatur"
      icon="i-heroicons-information-circle-16-solid"
    />
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium ex
      voluptatum aspernatur.
    </p>
    <div class="text-center my-8">
      <UButton size="xl" trailing-icon="i-heroicons-arrow-right"
        >Request Bimbingan</UButton
      >
    </div>
  </section>
  <section class="space-y-4 mb-6 pt-4 border-t border-gray-200">
    <h3 class="text-lg font-bold">Informasi</h3>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium ex
      voluptatum aspernatur, blanditiis sequi error provident tempore obcaecati
      optio aut sint hic consectetur. Repudiandae id explicabo est, enim magnam
      laborum.
    </p>
    <UAlert
      color="secondary"
      variant="subtle"
      title="Important!"
      description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium ex
      voluptatum aspernatur"
      icon="i-heroicons-information-circle-16-solid"
    />
  </section>
  <section class="space-y-4 mb-6 pt-4 border-t border-gray-200">
    <h3 class="text-lg font-bold">FAQs</h3>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium ex
      voluptatum aspernatur, blanditiis sequi error provident tempore obcaecati
      optio aut sint hic consectetur. Repudiandae id explicabo est, enim magnam
      laborum.
    </p>
    <AccordionFaq />
  </section>
</template>
