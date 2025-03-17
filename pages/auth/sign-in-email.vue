<script lang="ts" setup>
import { object, string } from "yup";

const { fetch: refreshSession } = useUserSession();

const toast = useToast();
definePageMeta({
  layout: "blank",
  middleware: ["guest"],
});

const schema = object({
  email: string().required().email(),
});

const state = reactive({
  email: "",
});

async function onSubmit() {
  $fetch("/api/auth/sing-in-email", {
    method: "POST",
    body: state,
  })
    .then(async () => {
      state.email = "";
      toast.add({ title: "Link telah berhasil dikirm" });
    })
    .catch((error) => {
      toast.add({ title: error.data.message, color: "error" });
    });
}
</script>

<template>
  <div class="h-screen w-full flex justify-center items-center">
    <div class="w-full max-w-96">
      <UCard>
        <h1 class="text-2xl font-medium mb-4">Sing In with Email</h1>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit.prevent="onSubmit"
        >
          <UFormField label="Email" name="email">
            <UInput
              class="w-full"
              v-model="state.email"
              placeholder="Email"
              size="lg"
              type="email"
              name="email"
            />
          </UFormField>
          <UButton type="submit" size="xl" block>Send Link</UButton>
        </UForm>
        <div class="mt-8">
          <UButton
            color="neutral"
            to="/auth/sign-in"
            variant="link"
            icon="i-heroicons-arrow-left"
            >Kembali</UButton
          >
        </div>
      </UCard>
    </div>
  </div>
</template>
