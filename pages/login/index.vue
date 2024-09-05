<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/zod'
import {useForm} from 'vee-validate'
import {toast} from 'vue-sonner'
import * as z from 'zod'

definePageMeta({ auth: false })

useSeoMeta({
	title: 'ISKER | Авторизация',
})

const { signIn } = useAuth()

const formSchema = toTypedSchema(
	z.object({
		username: z
			.string({ required_error: 'ИИН не может быть пустым' })
			.min(12, 'ИИН должен содержать как минимум 12 символов')
			.max(12, 'ИИН должен содержать не более 12 символов'),
		password: z.string({ required_error: 'Пароль не может быть пустым' }),
	})
)

const form = useForm({
	validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async value => {
	try {
    await signIn(value, { callbackUrl: '/' })
    toast.success('Вы вошли в аккаунт!')
  } catch (e) {
    console.log(e)
    toast.error('Неверный ИИН или пароль!')
  }
})
</script>

<template>
	<div class="flex items-center justify-center min-h-[calc(100vh-80px)] w-full">
		<div class="rounded dark:bg-neutral-900 bg-neutral-300 w-1/4 p-5">
			<h1 class="text-3xl font-bold text-center mb-5">Авторизация</h1>

			<form @submit="onSubmit">
				<UiFormField v-slot="{ componentField }" name="username">
					<UiFormItem class="mb-3">
						<UiFormLabel class="font-bold">ИИН</UiFormLabel>
						<UiFormControl>
							<UiInput v-bind="componentField" />
						</UiFormControl>
						<UiFormMessage />
					</UiFormItem>
				</UiFormField>

				<UiFormField v-slot="{ componentField }" name="password">
					<UiFormItem class="mb-3">
						<UiFormLabel class="font-bold">Пароль</UiFormLabel>
						<UiFormControl>
							<UiInput type="password" v-bind="componentField" />
						</UiFormControl>
						<UiFormMessage />
					</UiFormItem>
				</UiFormField>
				<div class="flex items-center justify-between">
					<NuxtLink
						to="/register"
						class="underline text-sm hover:text-red-500 transition-all"
					>
						Нет аккаунта?
					</NuxtLink>
					<UiButton type="submit" variant="secondary">Войти</UiButton>
				</div>
			</form>
		</div>
	</div>
</template>
