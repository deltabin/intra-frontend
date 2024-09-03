<script setup lang="ts">
const colorMode = useColorMode()
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="ghost">
        <Icon name="line-md:moon-alt-loop" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon name="line-md:sunny-outline-loop" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Сменить тему</span>
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end">
      <UiDropdownMenuItem @click="colorMode.preference = 'light'">
        Светлая тема
      </UiDropdownMenuItem>
      <UiDropdownMenuItem @click="colorMode.preference = 'dark'">
        Темная тема
      </UiDropdownMenuItem>
      <UiDropdownMenuItem @click="colorMode.preference = 'system'">
        Системная тема
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>