<script setup lang="ts">
const props = defineProps({
  icon: { type: String },
  name: { type: String },
  code: { type: String },
})
</script>

<template>
  <div class="min-w-64  max-w-full rounded shadow-lg px-6 py-4">
    <div class="flex items-center justify-between">
      <div><img :src="props.icon" :alt="props.name" class="w-8 h-8"></div>
      <div>{{  props.name  }}</div>
      <div class="font-bold font-mono">{{  props.code  }}</div>
    </div>
  </div>
</template>

<style scoped>
</style>
