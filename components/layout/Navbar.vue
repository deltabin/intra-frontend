<script lang="ts" setup>
const { data } = useAuth()
</script>

<template>
	<header class="px-8 py-5 w-full">
		<div class="flex justify-between items-center">
			<NuxtLink class="hover:text-red-500 transition-all" to="/">
				<span class="text-xl font-bold uppercase">Isker</span>
			</NuxtLink>
			<LayoutMenu v-if="data" />
			<div class="flex items-center gap-2">
				<ModeToggle />
				<LayoutUserNav v-if="data" />
			</div>
		</div>
	</header>
</template>
