<script setup lang="ts">
import {toast} from 'vue-sonner'

const { signOut, data } = useAuth()

const logout = async () => {
	try {
		await signOut({ callbackUrl: '/login' })
    await navigateTo('/login')
		toast.info('Вы вышли с аккаунта!')
	} catch (error) {
		console.log(error)
		toast.error('Произошла ошибка! Сообщите тех администратору')
	}
}
</script>

<template>
	<UiDropdownMenu>
		<UiDropdownMenuTrigger as-child>
			<UiButton variant="ghost" class="relative h-8 w-8 rounded-full">
				<UiAvatar class="h-8 w-8">
					<UiAvatarImage
						:src="data.user.profile_image"
						:alt="data.user.first_name"
					/>
					<UiAvatarFallback>
						<NuxtImg src="/no-user-image.webp" alt="no-user-image" />
					</UiAvatarFallback>
				</UiAvatar>
			</UiButton>
		</UiDropdownMenuTrigger>
		<UiDropdownMenuContent class="w-56" align="end">
			<UiDropdownMenuLabel class="font-normal flex">
				<div class="flex flex-col space-y-1">
					<p class="text-sm font-medium leading-none" v-if="data">
						{{ data.user.first_name }} {{ data.user.last_name }}
					</p>
					<p class="text-xs leading-none text-muted-foreground" v-if="data">
						{{ data.user.email_corp || data.user.email }}
					</p>
				</div>
			</UiDropdownMenuLabel>
			<UiDropdownMenuSeparator />
			<UiDropdownMenuGroup>
				<NuxtLink to="/profile">
					<UiDropdownMenuItem>
						Личный кабинет
						<UiDropdownMenuShortcut>⇧⌘P</UiDropdownMenuShortcut>
					</UiDropdownMenuItem>
				</NuxtLink>
				<UiDropdownMenuItem>
					Настройки
					<UiDropdownMenuShortcut>⌘B</UiDropdownMenuShortcut>
				</UiDropdownMenuItem>
				<NuxtLink
					to="http://local.isker.kz"
					target="_blank"
					rel="noopener noreferrer"
				>
					<UiDropdownMenuItem>
						Локал
						<UiDropdownMenuShortcut>⌘S</UiDropdownMenuShortcut>
					</UiDropdownMenuItem>
				</NuxtLink>
			</UiDropdownMenuGroup>
			<UiDropdownMenuSeparator />
			<UiDropdownMenuItem @click="logout">
				Выйти
				<UiDropdownMenuShortcut>⇧⌘Q</UiDropdownMenuShortcut>
			</UiDropdownMenuItem>
		</UiDropdownMenuContent>
	</UiDropdownMenu>
</template>
