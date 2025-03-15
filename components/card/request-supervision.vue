<script lang="ts" setup>
import { object, string } from "yup";

const config = useRuntimeConfig();
const toast = useToast();

const schema = object({
  id_minor: string().required().uuid(),
  id_lecturer1: string().required().uuid(),
  id_lecturer2: string().uuid(),
});

const model = reactive({
  id_minor: "23d867a8-6db3-4b5c-9296-af3519ed139f",
  is_two_supervisor: false,
});
</script>

<template>
  <UCard v-if="config.public.isOpenRequestSupervision">
    <UForm :state="model">
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-medium">Form Request Bimbingan</h3>
          <p class="text-gray-400 text-sm">
            Kamu tidak dapat merubah atau membatalkan permintaan bimbingan ini
            jika semua pembimbing menyetujui requset bimbingan ini. Oleh dari
            itu dimohon untuk mengisi form degan cermat.
          </p>
        </div>
        <div class="grid lg:grid-cols-2 gap-4">
          <UFormField label="Peminatan">
            <SelectMinor v-model="model.id_minor" />
          </UFormField>
          <div>
            <p class="text-gray-400 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              commodi voluptate sint magni nostrum ratione? Maxime, quo quasi
              soluta, assumenda, vel vero ad reprehenderit laboriosam ex enim
              hic incidunt? Dolores!
            </p>
          </div>
        </div>
        <div class="grid lg:grid-cols-2 gap-4 border-t border-gray-200 pt-4">
          <UFormField label="Jumlah Pembimbing">
            <UCheckbox
              v-model="model.is_two_supervisor"
              label="Dua Pembimbing"
            />
          </UFormField>
          <div>
            <p class="text-gray-400 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              commodi voluptate sint magni nostrum ratione? Maxime, quo quasi
              soluta, assumenda, vel vero ad reprehenderit laboriosam ex enim
              hic incidunt? Dolores!
            </p>
          </div>
        </div>
        <div class="grid lg:grid-cols-2 gap-4 border-t border-gray-200 pt-4">
          <div class="space-y-2">
            <UFormField
              :label="
                model.is_two_supervisor ? 'Pembimbing Pertama' : 'Pembimbing'
              "
            >
              <UInput
                class="w-full"
                size="lg"
                :placeholder="
                  model.is_two_supervisor
                    ? 'Pilih pembimbing pertama'
                    : 'Pilih pembimbing'
                "
              ></UInput>
            </UFormField>
          </div>
          <div>
            <p class="text-gray-400 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              commodi voluptate sint magni nostrum ratione? Maxime, quo quasi
              soluta, assumenda, vel vero ad reprehenderit laboriosam ex enim
              hic incidunt? Dolores!
            </p>
          </div>
        </div>
        <Transition>
          <div
            v-if="model.is_two_supervisor"
            class="grid lg:grid-cols-2 gap-4 border-t border-gray-200 pt-4"
          >
            <div class="space-y-2">
              <UFormField label="Pembimbing Kedua">
                <UInput
                  class="w-full"
                  size="lg"
                  placeholder="Pilih pembimbing"
                ></UInput>
              </UFormField>
            </div>
            <div>
              <p class="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt, commodi voluptate sint magni nostrum ratione? Maxime,
                quo quasi soluta, assumenda, vel vero ad reprehenderit
                laboriosam ex enim hic incidunt? Dolores!
              </p>
            </div>
          </div>
        </Transition>
        <div class="flex justify-end gap-2 border-t border-gray-200 pt-4">
          <UButton
            size="lg"
            color="neutral"
            variant="outline"
            trailing-icon="i-heroicons-x-mark"
            >Clear</UButton
          >
          <UButton size="lg" trailing-icon="i-heroicons-paper-airplane"
            >Sumbit</UButton
          >
        </div>
      </div>
    </UForm>
  </UCard>
  <UAlert
    v-once
    v-if="!config.public.isOpenRequestSupervision"
    color="warning"
    variant="subtle"
    title="Maaf, Permintaan bimbingan telah ditutup!"
    description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium ex
      voluptatum aspernatur"
    icon="i-heroicons-information-circle-16-solid"
  />
</template>
