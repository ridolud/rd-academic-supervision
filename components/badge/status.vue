<script lang="ts" setup>
const props = defineProps<{ status: SupervisorStatusEnum | undefined }>();
</script>

<template>
  <UBadge
    :color="{
        pending: 'warning' as const,
        approved: 'success' as const,
        rejected: 'error' as const
      }[status as string]"
    variant="outline"
    >{{ status }}</UBadge
  >
</template>
