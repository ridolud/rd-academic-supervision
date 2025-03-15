<script lang="ts" setup>
import { type DropdownMenuItem } from "#ui/types";

const config = useRuntimeConfig();

const { clear, user, loggedIn } = useUserSession();

const accountMenu = ref<DropdownMenuItem[][]>([
  [
    {
      label: user.value?.email,
      icon: "i-heroicons-at-symbol",
      type: "label",
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-heroicons-arrow-right-start-on-rectangle",
      onSelect: signOut,
    },
  ],
]);

const navigation = [
  { name: "Stikes ", href: "#" },
  { name: "Portal Mahasiswa", href: "#" },
  { name: "Bimbingan", href: "/bimbingan" },
];

const mobileMenuOpen = ref(false);

async function signOut() {
  await clear();
  mobileMenuOpen.value = false;
  navigateTo("/auth/sign-in");
}
</script>

<template>
  <header class="absolute inset-x-0 top-0 z-50">
    <div
      v-once
      v-if="!config.public.isOpenRequestSupervision"
      class="w-full bg-warning-500 text-center text-sm py-1 text-white"
    >
      Maaf, Request bimbingan telah ditutup!
    </div>
    <UContainer>
      <nav class="flex items-center justify-between py-6" aria-label="Global">
        <div class="flex lg:flex-1">
          <NuxtLink to="/" class="-m-1.5 py-1.5">
            <span class="sr-only">stikes-pertamedika</span>
            <img
              class="h-10 w-auto"
              src="https://stikes-pertamedika.ac.id/wp-content/uploads/2024/06/IHC-small.png"
              alt=""
            />
          </NuxtLink>
        </div>
        <div class="flex lg:hidden">
          <UButton
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true"
            variant="link"
            icon="i-heroicons-ellipsis-vertical"
          >
            <span class="sr-only">Open main menu</span>
          </UButton>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-sm/6 font-semibold hover:text-primary-800"
            >{{ item.name }}</NuxtLink
          >
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <div v-if="!loggedIn">
            <ButtonRequestSupervision />
          </div>
          <UDropdownMenu v-if="loggedIn" :items="accountMenu">
            <UButton icon="i-heroicons-user-circle-16-solid" variant="link">{{
              user?.name
            }}</UButton>
          </UDropdownMenu>
        </div>
      </nav>
    </UContainer>
    <UDrawer v-model:open="mobileMenuOpen" direction="right" class="w-full">
      <template #content>
        <div class="w-full p-6">
          <div class="flex items-center w-full justify-end">
            <UButton
              type="button"
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              @click="mobileMenuOpen = false"
              variant="link"
              icon="i-heroicons-x-mark"
            >
              <span class="sr-only">Close menu</span>
            </UButton>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-primary-800"
                  >{{ item.name }}</NuxtLink
                >
              </div>
              <div v-if="loggedIn" class="py-6">
                <div
                  class="-mx-3 rounded-lg px-3 py-2 text-base/7 hover:text-primary-800 flex items-center"
                >
                  <UIcon name="i-heroicons-user-circle-16-solid mr-2"></UIcon>
                  <span>{{ user?.name }}</span>
                </div>
                <a
                  @click="signOut"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base/7 hover:text-primary-800"
                  >Logout</a
                >
              </div>
              <div v-if="!loggedIn" class="py-6">
                <NuxtLink
                  to="/"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-primary-800"
                  >Request Bimbingan</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </UDrawer>
    <!-- <dialog
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-50" />
      <dialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-4 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="-m-1.5 py-1.5">
            <span class="sr-only">Your Company</span>
            <img
              class="h-10 w-auto"
              src="https://stikes-pertamedika.ac.id/wp-content/uploads/2024/06/IHC-small.png"
              alt=""
            />
          </NuxtLink>
          <UButton
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
            variant="link"
            icon="i-heroicons-x-mark"
          >
            <span class="sr-only">Close menu</span>
          </UButton>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-primary-800"
                >{{ item.name }}</NuxtLink
              >
            </div>
            <div v-if="loggedIn" class="py-6">
              <div
                class="-mx-3 rounded-lg px-3 py-2 text-base/7 hover:text-primary-800 flex items-center"
              >
                <UIcon name="i-heroicons-user-circle-16-solid mr-2"></UIcon>
                <span>{{ user?.name }}</span>
              </div>
              <a
                @click="signOut"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 hover:text-primary-800"
                >Logout</a
              >
            </div>
            <div v-if="!loggedIn" class="py-6">
              <NuxtLink
                to="/"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-primary-800"
                >Request Bimbingan</NuxtLink
              >
            </div>
          </div>
        </div>
      </dialogPanel>
    </dialog> -->
  </header>
</template>
