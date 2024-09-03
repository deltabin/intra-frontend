<script lang="ts" setup>
import {toast} from 'vue-sonner'

const { data } = useAuth()
const profileImageFile = ref<File | null>(null)

const onSubmit = (e: Event) => {
	e.preventDefault()
}

const uploadProfileImage = async () => {
	if (!profileImageFile.value) {
		console.log('No file selected')
		toast.error('Файл не выбран!')
		return
	}

	const formData = new FormData()
	formData.append('profile_image', profileImageFile.value)

	try {
		await $fetch(
			`http://45.86.80.42:8000/api/v1/users/${data.value.user.id}/`,
			{
				method: 'PATCH',
				body: formData,
			}
		)
		console.log('Image uploaded successfully')
		toast.success('Аватарка обновлена, пожалуйста перезагрузите страницу!')
	} catch (e) {
		console.error(`Upload error: ${e}`)
		toast.error('Ошибка загрузки! Сообщите тех администратору')
	}
}

const handleFileChange = (event: Event) => {
	const input = event.target as HTMLInputElement
	if (input.files && input.files[0]) {
		profileImageFile.value = input.files[0]
	}
}
</script>

<template>
	<form
		@submit.prevent="onSubmit"
		class="grid w-full max-w-sm items-center gap-1.5"
	>
		<UiLabel class="text-center" for="picture">Загрузить новое фото профиля</UiLabel>
		<div class="flex items-center mt-1.5 gap-2">
      <Icon name="material-symbols-light:add-photo-alternate" size="24" />
      <UiInput
          id="picture"
          type="file"
          @change="handleFileChange"
          class="dark:file:text-neutral-50"
      />
    </div>
		<UiButton class="mt-1.5" type="submit" @click="uploadProfileImage">Загрузить</UiButton>
	</form>
</template>
