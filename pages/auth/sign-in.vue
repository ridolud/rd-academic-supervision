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
  password: string().required().min(6),
});

const state = reactive({
  email: "",
  password: "",
});

async function onSubmit() {
  $fetch("/api/auth/sign-in", {
    method: "POST",
    body: state,
  })
    .then(async () => {
      await refreshSession();
      await navigateTo("/");
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
        <h1 class="text-2xl font-medium mb-4">Sing In</h1>
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
          <UFormField label="Password" name="password">
            <UInput
              class="w-full"
              v-model="state.password"
              placeholder="Password"
              size="lg"
              type="password"
              name="password"
            />
          </UFormField>
          <ULink class="text-sm">forgot password?</ULink>
          <UButton type="submit" size="xl" block>Sign In</UButton>
        </UForm>
      </UCard>
    </div>
  </div>
</template>
