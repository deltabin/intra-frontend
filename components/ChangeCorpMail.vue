<script setup lang="ts">

import {toast} from 'vue-sonner'

const {data} = useAuth()

const isDisabledMail = ref(false)


const sendChangeEmailCorp = async () => {
  try {
    await $fetch(`http://${useRuntimeConfig().public.API_NLS_URL}/HttpService/hs/NewHTTP/V1`, {
      method: 'POST',
      body: {
        iin_num: data.value.user.id_num,
        changeField: 'emailCorp',
        changeCase: 'change email'
      }
    })
  } catch (e) {
    console.error(`Error: ${e}`)
  }
}

const askChangeEmailCorp = async () => {
  isDisabledMail.value = true
  try {
    await sendChangeEmailCorp()
    isDisabledMail.value = false
    toast.success('Ваш запрос отправлен!')
  } catch (e) {
    console.error(`Error: ${e}`)
    toast.error('Ошибка отправки запроса!')
    isDisabledMail.value = false
  }
}
</script>

<template>

  <form>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <UiLabel class="text-center" for="email">Изменить корпоративную почту
      </UiLabel>
      <div class="flex items-center mt-1.5 gap-2">
        <Icon name="material-symbols:mail" size="24"/>
        <UiInput
            id="email"
            type="email"
            :defaultValue="data.user.email_corp"
            readonly
        />
      </div>
      <UiDialog>
        <UiDialogTrigger as-child>
          <UiButton class="mt-1.5"
                    :disabled="isDisabledMail">Изменить
          </UiButton>
        </UiDialogTrigger>
        <UiDialogContent class="sm:max-w-[425px]">
          <UiDialogHeader>
            <UiDialogTitle class="text-center">Подтверждение запроса
            </UiDialogTitle>
            <UiDialogDescription class="text-center mt-3">
              Ваш запрос об изменении ваших данных будет направлен сотруднику
              HR!
              <br/>Также Вы можете описать причину изменения Ваших данных
            </UiDialogDescription>
          </UiDialogHeader>
          <div class="grid gap-4 py-4">
            <UiTextarea />
          </div>
          <UiDialogFooter>
            <UiButton type="submit" @click="askChangeEmailCorp">
              Отправить
            </UiButton>
          </UiDialogFooter>
        </UiDialogContent>
      </UiDialog>
    </div>
  </form>
</template>
