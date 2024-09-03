<script setup lang="ts">
import UploadProfileImage from '~/components/UploadProfileImage.vue'

const {data} = useAuth()
</script>

<template>
  <div class="p-10">
    <UiCard class="w-[400px] flex items-center justify-center flex-col">
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
        <div class="flex flex-col gap-4">
          <UploadProfileImage/>
          <ChangeCorpMail/>
        </div>
      </UiCardContent>
      <UiCardFooter> Card Footer</UiCardFooter>
    </UiCard>
  </div>
</template>
