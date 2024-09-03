<script setup lang="ts">

const {data} = useAuth()

console.log(data.value.user)

</script>


<template>
  <div class="p-10 grid grid-cols-12 gap-4">
    <div class="col-span-3">
      <UiCard class="flex items-center justify-center flex-col">
        <UiCardHeader class="flex items-center justify-center">
          <UiAvatar class="h-32 w-32">
            <UiAvatarImage
                :src="data.user.profile_image"
                :alt="data.user.first_name"
            />
            <UiAvatarFallback>
              <NuxtImg src="/no-user-image.webp" alt="no-user-image"/>
            </UiAvatarFallback>
          </UiAvatar>

        </UiCardHeader>
        <UiCardContent>
          <div class="flex flex-col gap-2 text-center">
          <span class="font-bold">{{
              data.user.last_name
            }} {{ data.user.first_name }} {{ data.user.third_name }}</span>
            <div>
              <span class="font-bold">ИИН:</span>
              {{
                data.user.id_num
              }}
            </div>
            <div>
              <span class="font-bold">Телефон:</span>
              {{ data.user.phone }}
            </div>
            <div>
              <span class="font-bold">Личная почта:</span>
              {{ data.user.email }}
            </div>
            <div>
              <span class="font-bold">Корпоративная почта:</span>
              {{ data.user.email_corp }}
            </div>
          </div>
        </UiCardContent>
        <UiCardFooter>
          <NuxtLink to="profile/edit">
            <UiButton class="flex gap-2">
              <Icon name="material-symbols-light:settings-account-box"
                    size="24"/>
              <span>Редактировать профиль</span>
            </UiButton>
          </NuxtLink>
        </UiCardFooter>
      </UiCard>
    </div>
    <div class="col-span-9">
      <Payslip />
    </div>
  </div>
</template>
