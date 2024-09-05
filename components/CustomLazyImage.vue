<template>
  <div>
    <img
        v-if="photo"
        :src="`data:image/jpeg;base64,${photo}`"
        :alt="`Изображение для ${name}`"
        class="rounded-md w-[300px] h-[200px] object-cover"
    />
    <div v-else class="flex items-center justify-center w-[300px] h-[200px] bg-gray-200 rounded-md">
      <span class="text-gray-500">Изображение не найдено</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  photo: string
  name: string
}>()
</script>