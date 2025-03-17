<script lang="ts" setup>
import { boolean, object, string } from "yup";

const config = useRuntimeConfig();
const toast = useToast();

const emits = defineEmits(["success"]);

const schema = object({
  id_minor: string().required().uuid(),
});

const model = reactive({
  id_minor: "",
  supervisor_qty: false,
});

async function onSubmit() {
  try {
    console.log("asdasd");
    const supervision = await $fetch("/api/supervision", {
      method: "post",
      body: {
        id_minor: model.id_minor,
        supervisor_qty: model.supervisor_qty ? 2 : 1,
      },
    });

    emits("success", supervision);
  } catch (err: any) {
    console.log(err);
    toast.add({ color: "error", title: err.data.message });
  }
}
</script>

<template>
  <UCard v-if="config.public.isOpenRequestSupervision">
    <UForm :state="model" :schema="schema" @submit="onSubmit">
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
          <UFormField label="Peminatan" required>
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
            <UCheckbox v-model="model.supervisor_qty" label="Dua Pembimbing" />
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
        <!-- <div class="grid lg:grid-cols-2 gap-4 border-t border-gray-200 pt-4">
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
        </Transition> -->
        <div class="flex justify-end gap-2 border-t border-gray-200 pt-4">
          <UButton
            type="submit"
            size="lg"
            trailing-icon="i-heroicons-paper-airplane"
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
