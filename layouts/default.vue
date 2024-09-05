<script setup lang="ts">
useSeoMeta({
  title: 'ISKER | Панель управления',
})
</script>

<template>
  <section style="min-height: 100vh">
    <LayoutNavbar />
    <div>
      <slot/>
    </div>
  </section>
</template>

