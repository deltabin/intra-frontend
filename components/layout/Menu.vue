<script setup lang="ts">
import {MENU_DATA} from '~/components/layout/menu.data'
</script>

<template>
  <div class="flex gap-3">
    <NuxtLink  v-for="item in MENU_DATA" :key="item.name" :to="item.url"
              class="flex items-center py-1 px-3 rounded-lg font-medium hover:text-red-500 transition-all">
      <Icon :name="item.icon" class="mr-3"/>
      <span>{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>
